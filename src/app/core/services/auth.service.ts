import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  role: 'customer' | 'admin';
  token?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      const user = JSON.parse(savedUser);
      user.token = token;
      this.currentUserSubject.next(user);
    }
  }

  /**
   * Login user
   */
  login(email: string, password: string): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.apiUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.handleAuthResponse(response.data);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Register new user - Real backend call
   */
  register(userData: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.apiUrl}/auth/register`, userData).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.handleAuthResponse(response.data);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Handle successful authentication response
   */
  private handleAuthResponse(authData: AuthResponse): void {
    // Store token and user data
    console.log('Authentication successful:', authData);
    localStorage.setItem('token', authData.token);
    // localStorage.setItem('user', JSON.stringify(authData.user));
    this.currentUserSubject.next(authData.user);
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || `Server error: ${error.status}`;
    }
    
    console.error('Auth error:', errorMessage);
    return throwError(() => ({ 
      success: false, 
      message: errorMessage,
      status: error.status 
    }));
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value && !!localStorage.getItem('token');
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  /**
   * Get current user value (synchronous)
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
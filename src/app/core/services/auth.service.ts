import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'customer' | 'admin';
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

  constructor(private router: Router) {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  /**
   * Login user
   */
  login(email: string, password: string): Observable<ApiResponse<User>> {
    // Mock login - replace with actual API call
    return of<ApiResponse<User>>({
      success: true,
      message: 'Login successful',
      data: {
        id: 1,
        email: email,
        first_name: 'John',
        last_name: 'Doe',
        phone: '01001202005',
        role: 'customer' as 'customer'
      }
    }).pipe(
      delay(1000), // Simulate network delay
      tap(response => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.currentUserSubject.next(response.data);
        }
      })
    );
  }

  /**
   * Register new user
   */
  register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
  }): Observable<ApiResponse<User>> {
    // Mock registration - replace with actual API call
    return of<ApiResponse<User>>({
      success: true,
      message: 'Registration successful',
      data: {
        id: Math.floor(Math.random() * 1000),
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone || '',
        role: 'customer' as 'customer'
      }
    }).pipe(
      delay(1000), // Simulate network delay
      tap(response => {
        if (response.success) {
          // Optionally auto-login after registration
          // You can either auto-login or just return success
          console.log('User registered:', response.data);
        }
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
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
   * Update user profile
   */
  updateProfile(userData: Partial<User>): Observable<ApiResponse<User>> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      return of({
        success: false,
        message: 'User not found',
        data: null as any
      });
    }

    const updatedUser = { ...currentUser, ...userData };
    
    return of({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    }).pipe(
      delay(500),
      tap(response => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.currentUserSubject.next(response.data);
        }
      })
    );
  }

  /**
   * Change password
   */
  changePassword(currentPassword: string, newPassword: string): Observable<ApiResponse<null>> {
    // Mock password change - replace with actual API call
    return of({
      success: true,
      message: 'Password changed successfully',
      data: null
    }).pipe(delay(800));
  }
}
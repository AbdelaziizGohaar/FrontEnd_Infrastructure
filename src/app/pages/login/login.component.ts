import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal(false);
  showPassword = signal(false);
  serverError = signal<string | null>(null);
  rememberMe = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public lang: LanguageService
  ) {
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    
    this.loginForm = this.fb.group({
      email: [rememberedEmail || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [!!rememberedEmail]
    });
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading.set(true);
    this.serverError.set(null);

    const { email, password, rememberMe } = this.loginForm.value;

    // Handle remember me
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Call auth service
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          // Redirect to intended page or home
          const redirectUrl = localStorage.getItem('redirectUrl') || '/';
          localStorage.removeItem('redirectUrl');
          this.router.navigate([redirectUrl]);
        } else {
          this.serverError.set(response.message || 'Login failed. Please try again.');
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        // Handle different error scenarios
        if (error.status === 401) {
          this.serverError.set('Invalid email or password. Please try again.');
        } else if (error.status === 403) {
          this.serverError.set('Your account has been disabled. Please contact support.');
        } else if (error.status === 429) {
          this.serverError.set('Too many attempts. Please try again later.');
        } else {
          this.serverError.set(error.error?.message || 'An error occurred. Please try again.');
        }
      }
    });
  }

  // Helper method to check if field has error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field?.touched && field?.hasError(errorType) || false;
  }

  // Get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field?.touched) return '';

    if (field.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  // Social login handlers (implement based on your backend)
  loginWithGoogle(): void {
    // Implement Google OAuth
    window.location.href = 'http://localhost:3000/api/auth/google';
  }

  loginWithFacebook(): void {
    // Implement Facebook OAuth
    window.location.href = 'http://localhost:3000/api/auth/facebook';
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from 'express';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router, public DialogRef: MatDialogRef<LoginComponent>) {
    // יצירת ה-FormGroup עם שדות וולידציה
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]], // שדה סיסמה, וולידציה חובה ואורך מינימלי      
    });
  }

  // פונקציה לשליחה של הטופס

  onSubmit() {
    if (this.loginForm.valid) {
      // שולחים את הנתונים ל-UserService להתחברות
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          alert('ההתחברות הצליחה!');
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('role', response.role);
          this.DialogRef.close();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          // console.error('Error logging in', error);
          alert('שגיאה בהתחברות');
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; // Add this import


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder , private userService: UserService, 
    private router: Router,public DialogRef:MatDialogRef<LoginComponent>) {
    // יצירת ה-FormGroup עם שדות וולידציה
    this.registerForm = this.fb.group({
      name: ['', Validators.required], // שדה שם, וולידציה חובה
      email: ['', [Validators.required, Validators.email]], // שדה דוא"ל, וולידציה חובה ופורמט דוא"ל
      password: ['', [Validators.required, Validators.minLength(4)]], // שדה סיסמה, וולידציה חובה ואורך מינימלי
      role: ['', Validators.required] // שדה תפקיד, וולידציה חובה
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('registerForm valid');


      // שולחים את הנתונים ל-UserService לרישום
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {          
          console.log('User registered successfully', response);
          this.DialogRef.close();
          this.router.navigate(['/home']);
          alert('ההרשמה הצליחה!');

          sessionStorage.setItem('token',response.token)
        },
        error: (error) => {
          console.error('Error registering user', error);
          alert('שגיאה בהרשמה');
        }       
      });
    
    }
  }
}

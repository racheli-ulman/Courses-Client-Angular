import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-loginandregester',
  imports: [MatCardModule,MatIconModule,MatToolbarModule,MatButtonModule],
  templateUrl: './loginandregester.component.html',
  styleUrl: './loginandregester.component.css'
})
export class LoginandregesterComponent {
  constructor(private dialog: MatDialog) { }

  LoginOrRegester(type: string) {
    if (type === 'login') {
      // this.router.navigate(['/login']);
      this.dialog.open(LoginComponent, { width: '400px' });
    } else if (type === 'register') {
      // this.router.navigate(['/register']);
      this.dialog.open(RegisterComponent, { width: '400px' });
    }
  }
}

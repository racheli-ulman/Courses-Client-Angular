import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userRole:string|undefined|null
  constructor(private router: Router) {
    this.userRole = localStorage.getItem('role');
   }
  
   addCourse() {
    this.router.navigate(['/home/add-course'])
  }
  showCourse(){
    console.log(this.userRole);   
    this.router.navigate(['/home/courses'])
  }
  returnHome(){
    this.router.navigate(['/home']);
  }
}

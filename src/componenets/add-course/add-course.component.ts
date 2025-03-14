import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  addCourseForm: FormGroup;
  constructor(private fb: FormBuilder , private coursesService: CoursesService, 
      private router: Router){
    this.addCourseForm = this.fb.group({
         title: ['', Validators.required],
         description: ['', [Validators.required]], 
         teacherId:['']
       });
  }
  onSubmit() {
    if (this.addCourseForm.valid) {
      console.log('addCourseForm valid');

      this.addCourseForm.patchValue({
        teacherId: sessionStorage.getItem('userId')
      })
      // שולחים את הנתונים ל-UserService לרישום
      this.coursesService.createCourse(this.addCourseForm.value).subscribe({
        next: (response) => {          
          console.log('Course created successfully', response);
          // this.router.navigate(['/courses']);
          alert('Course created successfully');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error creating course', error);
          alert('שגיאה בהוספת קורס');
        }       
      });
    
    }
  }
}

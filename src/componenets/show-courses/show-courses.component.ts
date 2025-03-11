import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Router, RouterOutlet } from '@angular/router';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-show-courses',
  imports: [],
  templateUrl: './show-courses.component.html',
  styleUrl: './show-courses.component.css'
})
export class ShowCoursesComponent implements OnInit {
  courses: any[] = [];
  studentcourses: any[] = [];
  errorMessage: string = '';
  userRole: string | null;
  constructor(private coursesService: CoursesService, private router: Router, private lessonService: LessonsService) {
    this.userRole = localStorage.getItem('role');
  }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error(error);
      }
    });
    this.loadCoursesByStudent()
  }
  delete(id: number) {
    this.coursesService.deleteCourse(id).subscribe({
      next: (data) => {

        this.courses = this.courses.filter(c => c.id != id);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error(error);
      }
    });;

  }
  editCourse(id: number) {
    this.router.navigate(['/edit-course', id]);
  }

  addCourse() {
    this.router.navigate(['/add-course']);

  }
  // addLesson(id: number) {
  //   this.router.navigate(['/add-lesson', id]);

  // }
  showLesson(id: number) {
    this.router.navigate(['/show-lesson', id])
  }
  loadCoursesByStudent(): void {
    const studentId = localStorage.getItem('userId');
    
    if (studentId) {
      this.coursesService.getStudentCourses(studentId).subscribe({
        next: (data) => {
          this.studentcourses = data;  
        },
        error: (error) => {
          console.error('Error fetching student courses:', error);
        }
      });
    }
  }

  AddPerson(courseId: number) {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      console.error('User not logged in.');
      return;
    }
    this.coursesService.enrollStudent(courseId, userId).subscribe({
      next: () => {
        console.log('Student enrolled successfully');
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט
      },
      error: (error) => {
        console.error('Error enrolling in course:', error);
      }
    });
  }
  deletePerson(courseId: number) {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      console.error('User not logged in.');
      return;
    }

    this.coursesService.unenrollStudent(courseId, userId).subscribe({
      next: () => {
        console.log('Student unenrolled successfully');
        this.loadCoursesByStudent(); 

      },
      error: (error) => {
        console.error('Error unenrolling from course:', error);
      }
    });
  }

  isEnoled(courseId: number): boolean {    
    return this.studentcourses.some(course => course.id === courseId);
  }
}

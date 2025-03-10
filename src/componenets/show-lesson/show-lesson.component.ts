import { Component } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-lesson',
  imports: [],
  templateUrl: './show-lesson.component.html',
  styleUrl: './show-lesson.component.css'
})
export class ShowLessonComponent {
  lessons: any[] = [];
  courseId: number | undefined;
  errorMessage: string = '';
  lessonId: number | undefined;
  userRole: string | null;
  constructor(public LessonService: LessonsService, public router: Router,private activatedRoute:ActivatedRoute) {
    this.courseId=Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userRole = localStorage.getItem('role');
  }

  ngOnInit(): void {
    
    if (this.courseId !== undefined) {

      this.LessonService.getLessonsByCourseId(this.courseId).subscribe({
        next: (data) => {
          console.log(data);
          this.lessons = data;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load lessons';
          console.error(error);
        }
      });
    }
  }

  delete(id: number) {
    if (this.courseId)
      this.LessonService.deleteLesson(id, this.courseId).subscribe({
        next: (data) => {
          console.log('data ' + data);

          this.lessons = this.lessons.filter(l => l.id != id);
        },
        error: (error) => {
          this.errorMessage = 'Failed to load courses';
          console.error(error);
        }
      });;
  }
  editLesson(id: number) {
    this.courseId
    this.router.navigate(['/edit-lesson', this.courseId,id]);
  }
  addLesson() {
    this.router.navigate(['/add-lesson', this.courseId]);
  }
}

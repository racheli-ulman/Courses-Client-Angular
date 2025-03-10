import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonsService } from '../../services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-lesson',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent {
  editLessonForm: FormGroup;
  courseId: number | undefined;
  lessonId:number|undefined;
  constructor(private fb: FormBuilder, private lessonService: LessonsService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.editLessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required]],
      courseId: ['']
    });
  }

  ngOnInit() {
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('courseId'));
    this.lessonId = Number(this.activatedRoute.snapshot.paramMap.get('lessonId'));
    console.log("courseId "+this.courseId);
    console.log("lessonId "+this.lessonId);
    
    this.lessonService.getLessonById(this.courseId,this.lessonId).subscribe({
      next: (response) => {
        this.editLessonForm.patchValue({
          title: response.title,
          content: response.content,
          courseId: response.courseId
        })
      },
      error: (error) => {
        console.error('Error get course with id', this.lessonId);
      }
    });
  }
  onSubmit() {
    if (this.editLessonForm.valid && this.lessonId) {
      console.log('editCourseForm valid');

      // שולחים את הנתונים ל-UserService לרישום
      this.lessonService.updateLesson(this.lessonId, this.editLessonForm.value.courseId, this.editLessonForm.value).subscribe({
        next: (response) => {
          console.log('Course created successfully', response);
          this.router.navigate(['home/courses']);
          alert('Lesson updated successfully');

        },
        error: (error) => {
          console.error('Error updated lesson', error);
          alert('שגיאה בעדכון שיעור');
        }
      });

    }
  }
}

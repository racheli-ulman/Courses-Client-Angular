import { Routes } from '@angular/router';
import { LoginandregesterComponent } from '../componenets/loginandregester/loginandregester.component';
import { HomeComponent } from '../componenets/home/home.component';
import { ShowCoursesComponent } from '../componenets/show-courses/show-courses.component';
import { AddCourseComponent } from '../componenets/add-course/add-course.component';
import { AddLessonComponent } from '../componenets/add-lesson/add-lesson.component';
import { LoginComponent } from '../componenets/login/login.component';
import { EditCourseComponent } from '../componenets/edit-course/edit-course.component';
import { RegisterComponent } from '../componenets/register/register.component';
import { ShowLessonComponent } from '../componenets/show-lesson/show-lesson.component';
import { EditLessonComponent } from '../componenets/edit-lesson/edit-lesson.component';

export const routes: Routes = [
    { path: '', component: LoginandregesterComponent },
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'courses', component: ShowCoursesComponent },
            { path: 'add-course', component: AddCourseComponent }
        ]
    },
    { path: 'add-lesson', component: AddLessonComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'edit-course/:id', component: EditCourseComponent },
    { path: 'show-lesson/:id', component: ShowLessonComponent },
    { path: 'edit-lesson/:courseId/:lessonId', component: EditLessonComponent},
    { path: 'add-lesson/:id', component: AddLessonComponent}


];

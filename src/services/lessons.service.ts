import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }
  private apiUrl="http://localhost:3000/api/courses"
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    console.log("tocken "+token);
    
    return new HttpHeaders({

      'Authorization': `Bearer ${token}`
    });
  }

  // Get all lessons by course ID
  getLessonsByCourseId(courseId: number): Observable<any> {
    console.log("lesson "+courseId,this.getHeaders());
  
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons`,{headers:this.getHeaders()})
  }

  // שליפת שיעור לפי ID
  getLessonById(courseId: number, id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${id}`, { headers: this.getHeaders() });
  }

  // יצירת שיעור חדש
  createLesson(courseId: number, title: string, content: string): Observable<any> {
    const url = `${this.apiUrl}/${courseId}/lessons`;
    const body = { title, content, courseId };
    return this.http.post(url, body, { headers: this.getHeaders() });
  }
  // createLesson(courseId: number, title: string, content: string): Observable<any> {
  //   const body = { title, content,courseId };
  //   return this.http.post(`${this.apiUrl}/${courseId}/lessons`, body,{headers:this.getHeaders()});
  // }
  // createLesson1(courseId: number, title: string, content: string, token: string): Observable<any> {
  //   const url = `${this.apiUrl}/${courseId}/lessons`;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  // }
  // עדכון שיעור לפי ID
  updateLesson(id: number,courseId:string, updates: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${id}`, updates,{headers:this.getHeaders()});
  }

  // מחיקת שיעור לפי ID
  deleteLesson(id: number,courseId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${id}`,{headers:this.getHeaders()});
  }
}






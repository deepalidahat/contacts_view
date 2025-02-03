import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { contactDetails } from './dashboard/contact-detail/data_type';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:3001/contacts'; 


  constructor(private http: HttpClient) { }



  // getContacts(id?:any): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
    
  // }
  getContacts(id?: any): Observable<any> {
    return id ? this.http.get<any>(`${this.apiUrl}/${id}`) : this.http.get<any[]>(this.apiUrl);
  }

  // Update contact using PATCH request
  updateContact(id: any, contactData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, contactData);
  }
  postContact(contact: contactDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }
  // DELETE a contact by ID
  deleteContact(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  _id?: string;
  Name: string;
  Age: number;
  Gender: string;
  "Mobile number": string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:3000/person'; // Updated to point to backend on port 3000

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  getPerson(id: string): Observable<Person> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  updatePerson(id: string, person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Person>(url, person);
  }

  deletePerson(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}

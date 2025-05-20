// person.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'http://localhost:3000/person';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl, person);
  }

  updatePerson(id: string, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.baseUrl}/${id}`, person);
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}/${id}`);
  }
}

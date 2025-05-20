import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from '../../services/person.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getPersons()
      .subscribe(persons => this.persons = persons);
  }

  editPerson(id: string): void {
    this.router.navigate(['/persons/edit', id]);
  }

  deletePerson(id: string): void {
    this.router.navigate(['/persons/delete', id]);
  }

  createPerson(): void {
    this.router.navigate(['/persons/create']);
  }
}

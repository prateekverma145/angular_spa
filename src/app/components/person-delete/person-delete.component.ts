import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService, Person } from '../../services/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-delete.component.html',
  styleUrl: './person-delete.component.css'
})
export class PersonDeleteComponent implements OnInit {
  personId!: string;
  person: Person | undefined;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('id')!;
    this.getPerson(this.personId);
  }

  getPerson(id: string): void {
    this.personService.getPerson(id).subscribe({
      next: (person) => this.person = person,
      error: (err) => {
        console.error('Error fetching person:', err);
        // Handle error (e.g., show error or navigate back)
        this.router.navigate(['/persons']); // Navigate back if person not found
      }
    });
  }

  confirmDelete(): void {
    if (this.personId) {
      this.personService.deletePerson(this.personId).subscribe({
        next: () => {
          console.log('Person deleted successfully');
          this.router.navigate(['/persons']);
        },
        error: (err) => {
          console.error('Error deleting person:', err);
          // Handle error
        }
      });
    }
  }

  cancelDelete(): void {
    this.router.navigate(['/persons']);
  }
}

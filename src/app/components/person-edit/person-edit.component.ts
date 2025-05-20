import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonService, Person } from '../../services/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent implements OnInit {
  personForm!: FormGroup;
  personId!: string;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('id')!;
    this.getPerson(this.personId);
  }

  getPerson(id: string): void {
    this.personService.getPerson(id).subscribe({
      next: (person) => {
        this.personForm = this.fb.group({
          _id: [person._id],
          Name: [person.Name, Validators.required],
          Age: [person.Age, [Validators.required, Validators.min(0)]],
          Gender: [person.Gender, Validators.required],
         'Mobile number': [
    person['Mobile number'],
    [
      Validators.required,
      // exactly 10 digits
      Validators.pattern(/^\d{10}$/)
    ]
  ]
        });
      },
      error: (err) => {
        console.error('Error fetching person:', err);
        // Handle error (e.g., show a not found message or navigate back)
      }
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.personService.updatePerson(this.personId, this.personForm.value).subscribe({
        next: () => {
          this.router.navigate(['/persons']);
        },
        error: (err) => {
          console.error('Error updating person:', err);
          // Handle error
        }
      });
    }
  }
}

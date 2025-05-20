import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.css'
})
export class PersonCreateComponent implements OnInit {
  personForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      Name: ['', Validators.required],
      Age: ['', [Validators.required, Validators.min(2)]],
      Gender: ['', Validators.required],
      'Mobile number': [
    '',
    [
      Validators.required,
      // exactly 10 digits
      Validators.pattern(/^\d{10}$/)
    ]
  ]
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.personService.createPerson(this.personForm.value).subscribe({
        next: () => {
          this.router.navigate(['/persons']);
        },
        error: (err) => {
          console.error('Error creating person:', err);
          // Handle error (e.g., show an error message)
        }
      });
    }
  }
}

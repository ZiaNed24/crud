import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent {
  peopleList: any[] = [];
  displayedPeople: any[] = [];
  form: FormGroup;
  apiUrl = 'https://localhost:7283/api/People';
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  showError = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      personId: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/
          ),
        ],
      ], // Regex for standard emails ending with .com
    });
    this.getAllPeople();
  }

  getAllPeople() {
    this.http.get(this.apiUrl).subscribe((result: any) => {
      this.peopleList = result;
      this.totalItems = this.peopleList.length;
      this.updateDisplayedPeople();
    });
  }

  updateDisplayedPeople() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPeople = this.peopleList.slice(startIndex, endIndex);
  }

  onSave() {
    if (this.form.invalid) {
      this.showError = true; // Show error message when form is invalid
      setTimeout(() => (this.showError = false), 1500); // Blink effect for the error message
      return;
    }

    const personObj = this.form.value;

    if (personObj.personId === 0) {
      this.http.post(this.apiUrl, personObj).subscribe(() => {
        this.getAllPeople();
        this.resetForm();
      });
    } else {
      this.http.put(`${this.apiUrl}/${personObj.personId}`, personObj).subscribe(() => {
        this.getAllPeople();
        this.resetForm();
      });
    }
  }

  onEdit(data: any) {
    this.form.patchValue(data);
  }

  onDelete(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.getAllPeople();
    });
  }

  resetForm() {
    this.form.reset({
      personId: 0,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      email: '',
    });
    this.showError = false;
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedPeople();
  }

  getPages() {
    return Array.from({ length: Math.ceil(this.totalItems / this.itemsPerPage) }, (_, i) => i + 1);
  }
}

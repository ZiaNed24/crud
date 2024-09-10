import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeopleComponent } from './people/people.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PeopleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crudnew';
}

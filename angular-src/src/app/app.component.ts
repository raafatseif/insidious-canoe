// Bring in main angular package
import { Component } from '@angular/core';

// Decorator for the component
// Add meta data such as
 // selector: html tag we can use to insert the component
// templateUrl: html file assosiated with the component located at app.component.html
// styleUrls: style sheet to use for each component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Main class for the component
export class AppComponent {
  title = 'app';
}

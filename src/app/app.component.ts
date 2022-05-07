import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zi-hackathon-ants';
  x = 1;

  callClick() {
    console.log("clickewd")
  }
}

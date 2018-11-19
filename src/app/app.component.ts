import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public longText = `Mega Man X, known in Japan as Rockman X,[a] is an action-platform video game developed and published by Capcom for the Super Nintendo Entertainment System (SNES).
  1
  2
  3`;
  public minRows = 3;
  public maxRows = 4;
}

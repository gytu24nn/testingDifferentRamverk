import { Component } from '@angular/core';
import { HeaderComponent } from './Components/header/header.component';
import { HomePageComponent } from './Components/home-page/home-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularTest';
}

import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import { AlertComponent } from './services/alert/alert.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, AlertComponent]
})
export class AppComponent {
  title = 'angular-partner-portal';
}

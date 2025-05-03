import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, SearchComponent]
})
export class HeaderComponent implements OnInit {
  public account: string | undefined;

  constructor(private authService: AuthService) { }

  onLogout(): void {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.account = sessionStorage.getItem('username') ?? undefined;
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-maintab',
  templateUrl: './maintab.component.html',
  styleUrls: ['./maintab.component.css']
})
export class MaintabComponent implements OnInit {
  email: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.email = this.authService.userSubject.getValue().email;
  }

  onClickLogout() {
    this.authService.logout();
  }

}

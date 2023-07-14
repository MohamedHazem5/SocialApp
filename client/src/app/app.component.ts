import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  isHomePage!: boolean;
  registerMode = false;
  constructor(private accountService: AccountService,private router?: Router) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.router?.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/';
      }
    });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }


}

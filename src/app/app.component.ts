/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Jatin Hans 
*  Student ID: 141560201
*  Date: 10th April 2022
*
*  Angular App (Deployed) Link: https://seneca-music-web-422.vercel.app/login
*
*  User API (Heroku) Link: https://web422assignment-server.herokuapp.com/api/user

********************************************************************************/ 

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web422-a6';
  searchString: string;
  token: User;

  constructor(private router: Router, private auth: AuthService) {}

  handleSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
  }

  ngOnInit(): void {
    this.searchString = '';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

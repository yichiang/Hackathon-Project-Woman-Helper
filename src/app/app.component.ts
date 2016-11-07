import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { appDataService } from './appData.service';
import { Router } from '@angular/router';
import { Auth } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
  <nav class="navbar navbar-default">
  <div class="navbar-header">
    <a class="navbar-brand" href="#">HelpWoman</a>
    <ul class="nav navbar-nav navbar-right">
    <li><a class="navbar-right" href="#" routerLink="/demo">User Education Demo</a></li>
       <li class="dropdown">
         <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin Tools <span class="caret"></span></a>
         <ul class="dropdown-menu">
           <li><a href="#" routerLink="/user" routerLinkActive="active">User Admin</a></li>
           <li><a href="#" routerLink="/helper">Helper Admin</a></li>
           <li><a href="#" routerLink="/helpee">Helpee Admin</a></li>
           <li role="separator" class="divider"></li>
           <li><a href="#">Separated link</a></li>
         </ul>
       </li>
       <li class="pull-right"><a href="#" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</a></li>
       <li class="pull-right"><a href="#" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</a></li>
     </ul>
  </div>
  </nav>
  <div class="container">
  <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  users: any;
  errorMessage:string;
  constructor(private auth: Auth, private  myappService:appDataService, public router: Router) {
  }
  ngOnInit():void{
    this.myappService.getAllUsers()
    .subscribe(foundUsers => this.users=foundUsers,
                   error => this.errorMessage=<any>error);
  }
}

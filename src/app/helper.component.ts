import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { appDataService } from './appData.service';
import { Router } from '@angular/router';
import { Auth } from './auth.service';

@Component({
  selector: 'helper',
  template: `
  <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">All Helper</h3>
  </div>
  <div class="panel-body">
    <table class="table">
    <tr>
      <th>User Name</th>
      <th>User Phone</th>
      <th>location latitude </th>
      <th>location longitude</th>
      <th>Address </th>
      </tr>
        <tr *ngFor="let user of helpers">
        <td>{{user.name}}</td>
        <td>{{user.phone}}</td>
        <td>{{user.latitude}}</td>
        <td>{{user.longitude}}</td>
        <td>{{user.Address}}</td>
        </tr>
    </table>
  </div>
</div>
  `
})
export class HelperComponent {
  helpers: any;
  helper: any;
  errorMessage:string;
  constructor(private auth: Auth, private  myappService:appDataService, public router: Router) {
  }
  ngOnInit():void{
    this.myappService.getAllHelpers()
    .subscribe(foundUsers => {this.helpers=foundUsers; console.log(this.helpers);},
                   error => this.errorMessage=<any>error);
  }
}

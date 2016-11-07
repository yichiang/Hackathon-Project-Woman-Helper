import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { appDataService } from './appData.service';
import { Router } from '@angular/router';
import { Auth } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">All Users</h3>
  </div>
  <div class="panel-body">
    <table class="table">
    <tr>
      <th>User Name</th>
      <th>User Phone</th>
      <th>Accepted</th>
      <th>Be a Helper </th>
      <th>Be a Helpee </th>

      </tr>
        <tr *ngFor="let user of users">
        <td>{{user.name}}</td>
        <td>{{user.phone}}</td>
        <td>{{user.isAccepted}}</td>
        <td><input type=checkbox [checked]="user.HelperId" (change)="onHelperChange(user,$event)" />{{user.HelperId ? "Yes" :"No"}}</td>
        <td><input type=checkbox [checked]="user.NeedHelpId"/>{{user.NeedHelpId? "Yes" :"No" }}</td>
        </tr>
    </table>
  </div>
</div>
  <h2>Save user</h2>
  <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Add New User to Database</h3>
  </div>
  <div class="panel-body">
  <div class="form-group row">
  <label for="name-input" class="col-xs-2 col-form-label">User Name</label>
  <div class="col-xs-4">
    <input class="form-control" type="text" #newName id="name-input">
  </div>
  <label for="phone-input" class="col-xs-2 col-form-label">User Phone</label>
  <div class="col-xs-4">
    <input class="form-control" type="text" #newPhone  id="phone-input">
  </div>
</div>

<div class="form-group row">
<label for="isAcceptedChecked-input" class="col-xs-2 col-form-label">Is Accepted to Join in System</label>
<div class="col-xs-2">
  <input  class="" id="isAcceptedChecked-input" type="checkbox" (checked)="isAcceptedChecked" (change)="IsAcceptedChecked($event)"  /></div>
<label for="isHelperChecked-input" class="col-xs-2 col-form-label">Is Wanted to be helper</label>
<div class="col-xs-2">
<input  class="" id="isHelperChecked-input"  type="checkbox"  (checked)="isHelperChecked" (change)="IsHelpedChecked($event)" />
  </div>

  <label for="isHelpeeChecked-input" class="col-xs-2 col-form-label">Is Wanted to be Helpee</label>
  <div class="col-xs-2">
  <input class="" id="isHelpeeChecked-input" type="checkbox"  (checked)="isHelpeeChecked" (change)="IsHelpeeChecked($event)" />
    </div>
</div>
<div class="form-group row" [style.display]='isHelperChecked? "block":"none"'>
<label for="latitude-input" class="col-xs-2 col-form-label">Latitude</label>
<div class="col-xs-4">
  <input  id="latitude-input" class="form-control"  [style.display]='isHelperChecked? "block":"none"'  type="text" placeholder="latitude" #newLatitude value='{{helperLatitude}}'/></div>
<label for="longitude-input" class="col-xs-2 col-form-label"> Longitude</label>
<div class="col-xs-4">
  <input  id="longitude-input" class="form-control"  [style.display]='isHelperChecked? "block":"none"'  type="text" placeholder="longitude" #newLongitude value='{{helperLongutite}}'/></div>
</div>

<div class="form-group row" [style.display]='isHelperChecked? "block":"none"'>
<label for="address-input" class="col-xs-2 col-form-label">User Address</label>
<div class="col-xs-8">
  <input  id="address-input" class="form-control"    type="text" placeholder="address" #newAddress value=''/>
  </div>
  <div class="col-xs-2">
    <button (click)='getMyGeoLocation()'>Use my GetLocation</button>
  </div>
</div>


<div class="form-group row" [style.display]='isHelpeeChecked? "block":"none"'>
<label for="homeAddress-input" class="col-xs-2 col-form-label">Home Address</label>
<div class="col-xs-4">
  <input  id="homeAddress-input" class="form-control"    type="text" placeholder="address" #newHomeAddress value=''/>
  </div>
  <label for="workAddress-input" class="col-xs-2 col-form-label">Work Address</label>
  <div class="col-xs-4">
    <input  id="workAddress-input" class="form-control"    type="text" placeholder="address" #newWorkAddress value=''/>
  </div>
</div>
  <button (click)="addUser(newName.value, newPhone.value, newLatitude.value, newLongitude.value, newAddress.value,newHomeAddress.value, newWorkAddress.value )">Add</button>
  </div>
</div>


  `
})
export class UserComponent {
  users: any;
  user: any;
  isAcceptedChecked:boolean=false;
  isHelperChecked:boolean=false;
  isHelpeeChecked:boolean=false;
  errorMessage:string;
  location = {longitude:'0', latitude:'0'};
  helperLatitude:string ='';
  helperLongutite:string='';
  homeAddress:string ='';
  workAddress:string='';
  constructor(private auth: Auth, private  myappService:appDataService, public router: Router) {
  }
  ngOnInit():void{
    this.myappService.getAllUsers()
    .subscribe(foundUsers => {this.users=foundUsers; console.log(this.users);},
                   error => this.errorMessage=<any>error);
  }
  getMyGeoLocation(){
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };
  }
  setPosition(position){
    this.location = position.coords;
    this.helperLatitude=this.location.latitude;
    this.helperLongutite=this.location.longitude;
    console.log(position.coords);
  }
  onHelperChange(user,event){
    var helperState=event.target.checked;
    this.myappService.updateUserHelperState(user.id,user,helperState);
  }
  IsAcceptedChecked(e){
    this.isAcceptedChecked=e.target.checked;
  }
  IsHelpedChecked(e){
    this.isHelperChecked=e.target.checked;
  }
  IsHelpeeChecked(e){
    this.isHelpeeChecked=e.target.checked;
  }
  addUser(newName: string, newPhone:number, latitude:string, longitude:string,newAddress:string,newHomeAddress:string,newWorkAddress:string) {
    console.log(latitude);
     this.myappService.saveUsers(newName, newPhone, this.isAcceptedChecked,this.isHelperChecked, this.isHelpeeChecked,latitude,longitude,newAddress,newHomeAddress, newWorkAddress);
   }
  updateUser(key: string, newName: string) {
   this.users.update(key, { name: newName });
  }
   deleteUser(key: string) {
     this.users.remove(key);
   }
   deleteEverything() {
     this.users.remove();
   }
}

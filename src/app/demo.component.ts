import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { appDataService } from './appData.service';
import { Router } from '@angular/router';
import { Auth } from './auth.service';
import { User } from './User.model';
import { Helpee } from './Helpee.model';
import { Helper } from './Helper.model';
import { EventDetail } from './EventDetail.model';
import { LocationDetail } from './LocationDetail.model';
// import {GoogleplaceDirective} from '../directives/googleplace.directive';

@Component({
  selector: 'app-root',
  styleUrls: ['./demo.component.css'],
  template: `
  <div class="row">
  <div class="col-xs-5 phone-background">
    <div class="userSection0" *ngIf="userSection[0]">
      <button class="btn btn-primary">Helper</button>
      <button class="btn btn-info" (click)="HelpeeSectionMode()">Helpee</button>
    </div>
    <div class="userSection1" *ngIf="userSection[1]">
      <div>
      <h3> Your Name : {{helpee.name}}</h3>
      <h3> Your Phone: {{helpee.phone}}</h3>

      <label>current Destination Address</label>
      <input type="text" #userDestination value='{{helperAddress}}' />
      <p>Or</p>
      <p (click)="chooseWorkInput()" >
      <span class="glyphicon glyphicon-hdd" aria-hidden="true"></span>
      Work</p>
      <p (click)="chooseHomeInput()">
      <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
Home</p>
      </div>
      <button (click)="HelpeeSectionModeConfirm(userDestination.value)">Confirm</button>
    </div>
    <div class="userSection2" *ngIf="userSection[2]">

      <p>Destination: {{eventAccident.Destination}}</p>
      <p>Monitor your Location now</p>
      <p>save new location every mins to database</p>
      <p>{{currentAttid}} , {{currentLong}} <span>{{locationMessage}}</span></p>

      <sebm-google-map [latitude]="currentAttid" [longitude]="currentLong">
        <sebm-google-map-marker [latitude]="currentAttid" [longitude]="currentLong"></sebm-google-map-marker>
      </sebm-google-map>
      <button (click)="clearDangerModel()" class="btn btn-primary">Clear Situation</button>
      <button (click)="dangerModel()" class="btn btn-danger">Danger</button>
    </div>
    <div class="userSection3" *ngIf="userSection[3]">
      <div class="node1" *ngIf="!isHelpeeInImmidiateDanger">
        <p>Thank you for using our products</p>
      </div>
      <div class="node2" *ngIf="isHelpeeInImmidiateDanger">
        <p> we Called 911</p>
        <p> send your location to your contacts</p>
      </div>
    </div>
  </div>
  <div class="col-xs-5 phone-background">
    <div class="helperSection0" *ngIf="helperSection[0]">
      <button class="btn btn-primary" (click)="helperSectionStartMode()">Helper</button>
      <button class="btn btn-info">Helpee</button>
    </div>
    <div class="helperSection1" *ngIf="helperSection[1] && isHelperActive">
      <h1>Start monitor</h1>
      <div>
      <p>Your Name :{{helper.name}} </p>
      <p>Your Phone :{{helper.phone}} </p>
      <div *ngIf="eventAccident.id">
        <p>This event needs your attention</p>
          <p>{{helper.name}}</p>
          <p> {{currentAttid}},{{currentLong}}</p>
          <sebm-google-map [latitude]="currentAttid" [longitude]="currentLong">
            <sebm-google-map-marker [latitude]="currentAttid" [longitude]="currentLong"></sebm-google-map-marker>
          </sebm-google-map>
      </div>
      </div>
    </div>
    <div class="helperSection2" *ngIf="helperSection[2] &&isHelperActive">
      <h1>HelperSection2</h1>
      <div>
      <div class="node1" *ngIf="!isHelpeeInImmidiateDanger">
        <p>{{helpee.name}} is safe now.</p>
      </div>
      <div class="node2" *ngIf="isHelpeeInImmidiateDanger">
      <div *ngIf="eventAccident.id">
      <p>{{helpee.name}} is In Danger!! Please Call 911</p>

      <p>{{helpee.name}} destination:</p>
      <p> {{eventAccident.Destination}} </p>
          <p> {{currentAttid}},{{currentLong}}</p>
          <sebm-google-map [latitude]="currentAttid" [longitude]="currentLong">
            <sebm-google-map-marker [latitude]="currentAttid" [longitude]="currentLong"></sebm-google-map-marker>
          </sebm-google-map>
      </div>
      </div>
      </div>
  </div>
</div>

`
})
export class DemoComponent {
  userSection:Array<boolean>=[true,false,false,false];
  helperSection:Array<boolean>=[true,false,false,false];
  helpers: any;
  helper:Helper;
  helpee:Helpee;
  helpees:any;
  isHelperActive:boolean=false;
  errorMessage:string;
  eventAccident:EventDetail;
  currentLong:number=0;
  currentAttid:number=0;
  watchGeolocation:any;
  locationMessage:string='';
  helperAddress:string='';
  isHelpeeInImmidiateDanger=false;
  targetDestination= {
  latitude : 1000,
  longitude: 250
  };
  constructor(private auth: Auth, private  myappService:appDataService, public router: Router) {
  }
  ngOnInit():void{
    this.myappService.getAllHelpers()
    .subscribe(foundUsers => {this.helpers=foundUsers; console.log(this.helpers);},
                   error => this.errorMessage=<any>error);
   this.myappService.getAllHelpees()
   .subscribe(foundUsers => {this.helpees=foundUsers; console.log(this.helpees);},
                  error => this.errorMessage=<any>error);
    var newEvent= new EventDetail();
    this.eventAccident=newEvent;
  }
  clearDangerModel(){
    this.userSection[2]=false;
    this.userSection[3]=true;
    this.helperSection[1]=false;
    this.helperSection[2]=true;
    this.isHelpeeInImmidiateDanger=false;
    this.locationMessage='';
    this.helperAddress='';
  }
  clearResetModel(){
    this.userSection=[true,false,false,false];
    this.helperSection=[true,false,false,false];
    this.isHelpeeInImmidiateDanger=false;
    this.locationMessage='';
    this.helperAddress='';
  }
  chooseWorkInput(){
    this.helperAddress=this.helpees[0].WorkAddress;
    console.log("choose work");
  }
  chooseHomeInput(){
    this.helperAddress=this.helpees[0].HomeAddress;
    console.log("choose Home");
  }
  helperSectionStartMode(){
    this.helperSection[0]=false;
    this.helperSection[1]=true;
    this.isHelperActive=true;
    //random pickHelper but not self...
    this.helper= this.helpers[0];
    this.helper.isActive=true;
  }
  HelpeeSectionMode(){
    this.userSection[0]=false;
    this.userSection[1]=true;
    //get helpee name --chose first one in database
    this.helpee= this.helpees[0];
    //create new indicient to database
  }
  dangerModel(){
    this.userSection[2]=false;
    this.userSection[3]=true;
    this.helperSection[1]=false;
    this.helperSection[2]=true;
    this.isHelpeeInImmidiateDanger=true;
  }
  HelpeeSectionModeConfirm(userDestinationInput){
    this.userSection[1]=false;
    this.userSection[2]=true;
    // var newEvent= new EventDetail();
    // create new indicient to database
    this.eventAccident.NeedHelpId=this.helpee.$key;
    console.log(this.helpee);
    this.eventAccident.isMonitoring=true;
    this.eventAccident.dateTime=Date.now().toString();
    console.log(userDestinationInput);
    console.log(this.eventAccident);

    this.eventAccident.Destination=userDestinationInput;
    this.eventAccident=this.eventAccident;
    this.eventAccident=this.myappService.SaveEvents(this.eventAccident);
    console.log("Saved Event");
    console.log(this.eventAccident);
    this.sendLocationsToDb();
  }
  sendLocationsToDatabaseFunction;
  location = {longitude:0, latitude:0};

    sendLocationsToDb(){
      // this.sendLocationsToDatabaseFunction=setInterval(this.getMyGeoLocation, 1000);
      this.getMyGeoLocation();

    }

    setPosition(position){
      this.location = position.coords;
      this.currentAttid=this.location.latitude;
      this.currentLong=this.location.longitude;
      console.log(position.coords);
    }
    getMyGeoLocation(){
      var self=this;
      console.log(self.eventAccident);

      if(navigator.geolocation){
      this.watchGeolocation=navigator.geolocation.watchPosition(function success(pos) {
      var crd = pos.coords;

      console.log(self.currentAttid+" , "+self.currentLong)
      if (self.targetDestination.latitude === crd.latitude && self.targetDestination.longitude === crd.longitude) {
        console.log('Congratulations, you reached the target');
        navigator.geolocation.clearWatch(self.watchGeolocation);
      }
      if(self.currentAttid === crd.latitude && self.currentAttid === crd.longitude){
        self.locationMessage="Not Changed yet";
      }else{
        self.locationMessage="Update";
      }
      console.log("watch!!");
      self.currentAttid=crd.latitude;
      self.currentLong=crd.longitude;
      //save new location to db
      var newLocation= new LocationDetail(crd.latitude.toString(),crd.longitude.toString());
      newLocation.HelperId=self.helpers[0].$key;
      newLocation.dateTime=Date.now().toString();
      newLocation.EventDetailsId=self.eventAccident.id;
      newLocation=self.myappService.SaveLocations(newLocation);
      }, function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
      },  {
      enableHighAccuracy: false,
      timeout : 60000,
      maximumAge : 0
      });

      navigator.geolocation.getCurrentPosition((position)=>{
        self.location = position.coords;
        self.currentAttid=self.location.latitude;
        self.currentLong=self.location.longitude;
        console.log(self.eventAccident);
        console.log(position.coords);
      });
      };
    }

}

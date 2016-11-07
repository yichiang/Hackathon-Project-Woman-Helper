import { User } from './User.model';
import { Helpee } from './Helpee.model';
import { Helper } from './Helper.model';
import { EventDetail } from './EventDetail.model';
import { LocationDetail } from './LocationDetail.model';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2';

@Injectable()
export class appDataService{

  users:FirebaseListObservable<any>;
  helpers:FirebaseListObservable<any>;
  helpees:FirebaseListObservable<any>;
  eventDetails:FirebaseListObservable<any>;
  LocationDetails:FirebaseListObservable<any>;
  foundUser:FirebaseObjectObservable<User>;
  foundHelper:FirebaseObjectObservable<Helper>;
  foundHelpee:FirebaseObjectObservable<Helpee>;

  constructor(af: AngularFire) {
    this.users = af.database.list('/users', {
      query: {
        // limitToLast: 10,
        orderByKey: true
      }
    });
    this.helpers = af.database.list('/helpers', {
      query: {
        // limitToLast: 10,
        orderByKey: true
      }
    });
    this.helpees = af.database.list('/helpees', {
      query: {
        // limitToLast: 10,
        orderByKey: true
      }
    });
    this.eventDetails = af.database.list('/event', {
      query: {
        // limitToLast: 10,
        orderByKey: true
      }
    });
    this.LocationDetails= af.database.list('/location', {
      query: {
        // limitToLast: 10,
        orderByKey: true
      }
    });
  }
  getAllUsers():FirebaseListObservable<User>{
    return this.users;
  }
  getAllHelpers():FirebaseListObservable<Helpee>{
    return this.helpers;
  }
  getAllHelpees():FirebaseListObservable<Helper>{
    return this.helpees;
  }
  getAllLocationDetails():FirebaseListObservable<any>{
    return this.LocationDetails;
  }
  saveUsers(newName: string , newphone: number, newAcceptedStatus: boolean, isHelper:boolean, isHelpee: boolean,latitude:string ,longitude:string,newAddress:string,newHomeAddress:string,newWorkAddress:string) {
    var self=this;
    var newUser = new User(newName, newphone);
    newUser.isAccepted=newAcceptedStatus;
    this.users.push(newUser).then((item) => { newUser.id=item.key;
    console.log(newUser);
      if(newAcceptedStatus===true && isHelper===true)
      {
        var newHelper= new Helper(newUser.name, newUser.phone);
        newHelper.registerId = newUser.id;
        newHelper.latitude=latitude;
        newHelper.longitude=longitude;
        newHelper.address=newAddress;
        console.log(newHelper);
        this.helpers.push(newHelper).then((item) => {
        newUser.HelperId=item.key;
        self.users.update(newUser.id, newUser);
        });
      }

      if(newAcceptedStatus===true&&isHelpee===true)
      {
        var newHelpee= new Helpee(newUser.name, newUser.phone);
        newHelpee.HomeAddress=newHomeAddress;
        newHelpee.WorkAddress=newWorkAddress;
        newHelpee.registerId=newUser.id;
        this.helpees.push(newHelpee).then((item) => {
        newUser.NeedHelpId=item.key;
        self.users.update(newUser.id, newUser);
        });
      }
    });
  }
  updateUserHelperState(key: string, user:User,helperState:boolean) {
    var self=this;
    if(helperState){
      var newHelper= new Helper(user.name, user.phone);
      this.helpers.push(newHelper).then((item) => {
        console.log(item.key);
        console.log(key);
        console.log(user);
        user.HelperId=item.key;
        self.users.update(user.$key, {HelperId:item.key});
      });
    }else{
      this.helpers.remove(user.HelperId);
      user.HelperId=null;
      this.users.update(key, {HelperId: null});
    }
  }
  deleteUser(key: string) {
    this.users.remove(key);
  }
  deleteUsers() {
    this.users.remove();
  }
  SaveEvents(newEvent:EventDetail){
    this.eventDetails.push(newEvent).then((item) => { newEvent.id=item.key;
    newEvent.$key=item.key;});
    return newEvent;
  }

  SaveLocations(newLocation:LocationDetail){
    console.log(newLocation);
    this.LocationDetails.push(newLocation).then((item) => { newLocation.$key=item.key;
    newLocation.id=item.key;});
    return newLocation;
  }
}

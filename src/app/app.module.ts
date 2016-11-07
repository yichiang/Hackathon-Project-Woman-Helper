import { NgModule }            from '@angular/core';
import { BrowserModule  }      from '@angular/platform-browser';
import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { AppComponent }        from './app.component';
import { HomeComponent }       from './home.component';
import { UserComponent }       from './user.component';
import { HelperComponent }     from './helper.component';
import { DemoComponent }       from './demo.component';
import { routing,
         appRoutingProviders } from './app.routes';
import { AngularFireModule } from 'angularfire2';
import { appDataService } from './appData.service';
import { Auth } from './auth.service';
import { AgmCoreModule } from 'angular2-google-maps/core';

export const firebaseConfig = {
  apiKey: "firebaseKey",
   authDomain: "YourProjectname.firebaseapp.com",
   databaseURL: "Your firebase LINK",
   storageBucket: "ProjectName.appspot.com"
};
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserComponent,
        HelperComponent,
        DemoComponent,
    ],
    providers:    [
        appDataService,
        appRoutingProviders,
        Auth,
        AUTH_PROVIDERS
    ],
    imports:      [
        BrowserModule,
        routing,
        AngularFireModule.initializeApp(firebaseConfig),
        AgmCoreModule.forRoot({ apiKey: 'Google Map Key'})
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}

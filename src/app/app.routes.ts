import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';
import { HomeComponent }               from './home.component';
import { UserComponent }               from './user.component';
import { HelperComponent }               from './helper.component';
import { DemoComponent }               from './demo.component';

const appRoutes: Routes = [
  { path: '', component: DemoComponent },
  { path: 'user', component: UserComponent },
  { path: 'helper', component: HelperComponent },
  { path: 'demo', component: DemoComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

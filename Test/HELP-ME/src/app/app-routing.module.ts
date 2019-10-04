import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './component/map/map.component';
import { AccidentsComponent } from './component/accidents/accidents.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
const routes: Routes = [
  { path:'Ambulance',component:MapComponent},
  { path:'Accidents',component:AccidentsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }

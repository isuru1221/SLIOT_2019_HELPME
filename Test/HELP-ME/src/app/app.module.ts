import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import {FormsModule} from "@angular/forms";


// import { AngularFireModule} from '@angular/fire';
// import { AngularFireDatabaseModule} from '@angular/fire/database'
// import { AngularFirestoreModule} from'@angular/fire/firestore'
// import {environment} from "../environments/environment";
import { HttpClientModule } from '@angular/common/http';
import { AccidentsComponent } from './component/accidents/accidents.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AccidentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // AngularFirestoreModule,
    // AngularFireDatabaseModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

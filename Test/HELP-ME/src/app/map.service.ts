import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {GeoJson} from './component/map/mapClass';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MapService {
  items:Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }

  getMarkers(){
    // return this.db.list('/markers')
  }

  createMarker(data: GeoJson) {
    // return this.db.list('/markers')
    //   .push(data)
  }

  removeMarker($key: string) {
    // return this.db.object('/markers/' + $key).remove()
  }

}

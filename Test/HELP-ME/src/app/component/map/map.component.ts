import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../../environments/environment";
import { MapService } from '../../map.service';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  map: mapboxgl.Map;
  size = 200;
  data1 = [];
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 6.901608599999999;
  lng =  80.0087746;
  items:Observable<any[]>;
  geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [80.0087746, 6.901608599999999]
      }
    }
    ]
  };

  constructor(private mapService: MapService,
              private db: AngularFirestore,
              private  httpClient:HttpClient) {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mpbox.token);
  }

  ngOnInit() {
    this.items = this.db.collection('Ambulance').valueChanges();
    console.log(this.items);
    this.items.forEach(e => e.forEach(d => {
      const coordinates = [d.l._long, d.l._lat];
      const data = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates
        }
      };
      if(!this.geojson.features.includes(data)){
        this.geojson.features.push(data);
      }
      this.addMarker(coordinates);
    }));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.map  =new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center:  [-122.414, 37.776],
      zoom: 6
    });
    let data = this.data1;
    this.geojson.features.forEach(function(marker) {
      data.push(marker.geometry.coordinates);
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      const data = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates
        }
      };
      this.geojson.features.push(data);
      this.addMarker(coordinates);
      this.sendPostData(coordinates);
    })
  }


  sendPostData(coordinates){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.httpClient.post("http://us-central1-nodemcu1-26fc3.cloudfunctions.net/Ambulance",
      {
        "id":  Math.round(Math.random() * 10),
        "lat":  coordinates[1],
        "lon":  coordinates[0]
      }, httpOptions)
      .subscribe(
        data  => {
          console.log("POST Request is successful ", data);
        },
        error  => {
          console.log("Error", error);
        }
      )
  }

  addMarker(data){
    if(document.getElementById('hh')){
      console.log("pre")
    }
    new mapboxgl.Marker()
      .setLngLat(data)
      .addTo(this.map);

  }

}

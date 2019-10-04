// import {GeoCollectionReference, GeoFirestore} from "geofirestore";

export {Accidents} from './device';
export {Test} from  './data';
export {Ambulance} from './Vehicle';


/////////////////////
import * as functions from 'firebase-functions';
import {firestore} from './config';
//
// const geoFirestore: GeoFirestore = new GeoFirestore(firestore);
// const geoCollection: GeoCollectionReference = geoFirestore.collection('Ambulance');

export const nearby = functions.firestore
    .document('accidents/{accidentId}')
    .onCreate((snapshot,contex)=>{
        const data = snapshot.data();
        firestore.collection('Test').add({data:data})
            .then(()=>{
                // @ts-ignore
                console.log(data.d.coordinates)
                // const query = geoCollection.near({ center: new geoFire.GeoPoint(40.7589, -73.9851), radius: 1000 });
                // query.get().then( value => console.log(value))
            })
            .catch(console.log);

    })


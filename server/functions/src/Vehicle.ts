import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {GeoFirestore,GeoCollectionReference} from 'geofirestore';
import {firestore,geoFire} from './config';

const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.json());

const geoFirestore:GeoFirestore = new GeoFirestore(firestore);
const geoCollection:GeoCollectionReference = geoFirestore.collection('Ambulance');

app.post('/', async (req,res) => {
    geoCollection
        .add( {
        name:req.body.id,
        timestamp: geoFire.Timestamp.fromDate(new Date()),
        coordinates: new geoFire.GeoPoint(parseFloat(req.body.lat),parseFloat(req.body.lon))
        })
        .then( () => res.status(200).send("add"))
        .catch( e => res.status(500).send(e));
});

export const Ambulance = functions.https.onRequest(app);

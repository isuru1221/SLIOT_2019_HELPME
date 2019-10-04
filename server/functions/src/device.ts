import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { firestore ,geoFire  } from './config';
import { GeoCollectionReference, GeoFirestore} from 'geofirestore';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const geoFirestore: GeoFirestore = new GeoFirestore(firestore);
const geoCollection: GeoCollectionReference = geoFirestore.collection('accidents');

app.post('/', async (req, res) => {
    geoCollection
        .add({
            name:req.body.id,
            timestamp: geoFire.Timestamp.fromDate(new Date()),
            coordinates: new geoFire.GeoPoint(parseFloat(req.body.lat),parseFloat(req.body.lon))
        })
        .then(() => res.status(200).send("add"))
        .catch((e) => console.log(e));
});

export const Accidents = functions.https.onRequest(app);

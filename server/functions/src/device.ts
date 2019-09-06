import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import { firestore } from './config'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

export const Api = functions.https.onRequest(app);

app.get('/accidents/:id', async (req, res) => {
    try {
        const accidentId = req.params.id;
        if (!accidentId) {
            throw new Error('Invalid request');
        }
        const accident = await firestore.collection('accidents').doc(accidentId).get();
        if (!accident.exists){
            throw new Error('accident doesnt exist.')
        }
        res.status(200).json({
            id: accident.id,
            data: accident.data()
        });
    } catch(error){
        res.status(500).send(error);
    }
});


app.get('/accidents', async (req, res) => {
    try {
        const QuerySnapshot = await firestore.collection('accidents').get();
        const accidents:any[] = [];
        QuerySnapshot.forEach(
            (doc) => {
                accidents.push({
                    id: doc.id,
                    data: doc.data()
                });
            }
        );
        res.status(200).json(accidents);
    } catch(error){
        res.status(500).send(error);
    }
});


app.post('/accidents', async (req, res) => {
    try {
        console.log("req " + req.body);
        console.log("id " + req.body.id);
        console.log("data" + req.body.location);
        const data = {
            location:req.body.location,
            id:req.body.id
        };
        const Ref = await firestore.collection('accidents').add(data);
        const accidents = await Ref.get();
        res.status(200).json({
            id: accidents.id,
            data: accidents.data(),
        });
    }catch(error){
        res.status(500).send(error);
    }
});



app.put('/accidents/:id', async (req, res) => {
    try {
        const accidentId = req.params.id;
        const data = req.body.data;
        if (!accidentId || !data) {
            throw new Error('Invalid request');
        }
        const Data = { data };
        await firestore.collection('accidents')
            .doc(accidentId)
            .set(Data, { merge: true });
        res.status(200).json({
            id: accidentId,
            data
        })
    } catch(error){
        res.status(500).send(error);
    }

});


app.delete('/accidents/:id', async (req, res) => {
    try {
        const accidentId = req.params.id;
        if (!accidentId){
            throw new Error('Invalid request');
        }
        await firestore.collection('accidents')
            .doc(accidentId)
            .delete();
        res.status(200).send("Delete")
    } catch(error){
        res.status(500).send(error);
    }
});

import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { firestore} from './config';

const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.json());
export const Test = functions.https.onRequest(app);


let getAll = async (name:string) =>{
    const QuerySnapshot = await firestore.collection(name).get();
    const Array:any[] = [];
    QuerySnapshot.forEach(
        (doc) => {
            Array.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );
    return Array;
};

let getOne =  async (name:string,id:string)=>{
    console.log(`Data ${name} id : ${id}`);
    const Data = await firestore.collection(name).doc(id).get().then();
    if (!Data.exists){
        throw new Error('accident doesnt exist.')
    }else{
        console.log("Out: " + Data);
        return Data;
    }
};

let Delete = async (name:string,id:string) =>{
    if (!id){
        throw new Error('Invalid request');
    }
    await firestore.collection(name)
        .doc(id)
        .delete();
};




app.get('/accidents/:id', async (req, res) => {
    getOne('accidents',req.body.id)
        .then(accidents =>  res.status(200).send(accidents))
        .catch(e=>res.status(404).send(e));
});

app.get('/accidents', async (req, res) => {
    getAll('accidents')
        .then(accidents =>res.status(200).json(accidents))
        .catch(e =>res.status(404).json(e))
});

app.delete('/accidents/:id', async (req, res) => {
    Delete('accidents',req.body.id)
        .then(()=>res.status(200).send("Delete"))
        .catch(e => res.status(404).send(e));
});

//Ambulance

app.get('/Ambulance/:id', async (req, res) => {
    getOne('Ambulance',req.body.id)
        .then(Ambulance =>  res.status(200).send(Ambulance))
        .catch(e=>res.status(404).send(e));
});

app.get('/Ambulance', async (req, res) => {
    getAll('Ambulance')
        .then(Ambulance =>res.status(200).json(Ambulance))
        .catch(e =>res.status(404).json(e))
});

app.delete('/Ambulance/:id', async (req, res) => {
    Delete('Ambulance',req.body.id)
        .then(()=>res.status(200).send("Delete"))
        .catch(e => res.status(404).send(e));
});

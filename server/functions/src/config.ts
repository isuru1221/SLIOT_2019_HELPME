import * as admin from 'firebase-admin'
// @ts-ignore
import * as serviceAccount from '../key/key.json'

const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
};

admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: "https://nodemcu1-26fc3.firebaseio.com/"
});

export const firestore = admin.firestore();
export const database = admin.database();
export const geoFire =  admin.firestore;

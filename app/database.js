import firebase from 'firebase';
import config from './config';
import { db } from './firebase';

const firebaseApp = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID
};

//firebase.initializeApp(firebaseApp);
//const database = firebase.database();
const database = db;

export default database;

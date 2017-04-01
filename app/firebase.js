import firebase from 'firebase'
import config from './config'

const firebaseApp = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID
}

firebase.initializeApp(firebaseApp)
export const database = firebase.database()
export const auth = firebase.auth()

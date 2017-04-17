import RNFirebase from 'react-native-firebase'
import config from './config'

const firebaseApp = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  persistence: true
}

const firebase = RNFirebase.initializeApp(firebaseApp)
export const database = firebase.database()
export const auth = firebase.auth()
export const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP

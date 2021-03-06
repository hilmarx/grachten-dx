// Mirror state of Reach to a firebase instance
import Rebase from 're-base'
// Official firebase package
import firebase from 'firebase'

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
    apiKey: process.env.CREATE_REACT_1,
    authDomain: "dutchx-stats-2.firebaseapp.com",
    databaseURL: "https://dutchx-stats-2.firebaseio.com"
  });

const base = Rebase.createClass(firebaseApp.database());
// export default base;

export { firebaseApp }
export default base;
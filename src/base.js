// Mirror state of Reach to a firebase instance
import Rebase from 're-base'
// Official firebase package
import firebase from 'firebase'

// Creates firebase App
const firebaseApp = firebase.initializeApp({
    apiKey: "x",
    authDomain: "x",
    databaseURL: "x"
})

// Create Firebase x Rebase bindings
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }
export default base;
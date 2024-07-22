// firebase.js
import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCSmkVUaVVounCXOCa-ZYYkxZf2bvlUf18",
    authDomain: "jewelrystoreprn221.firebaseapp.com",
    projectId: "jewelrystoreprn221",
    storageBucket: "jewelrystoreprn221.appspot.com",
    messagingSenderId: "901945886108",
    appId: "1:901945886108:web:12750f62f10d0df3cab459",
    measurementId: "G-01EY2R3L8P"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
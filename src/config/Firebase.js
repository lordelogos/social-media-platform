import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA-cBzrE3A5jGwwZ_v-1MDlJPI6_93QmrM",
	authDomain: "social-6012d.firebaseapp.com",
	databaseURL: "https://social-6012d.firebaseio.com",
	projectId: "social-6012d",
	storageBucket: "social-6012d.appspot.com",
	messagingSenderId: "419176475717",
	appId: "1:419176475717:web:fe63f834bacc40a0eac72c",
	measurementId: "G-4ZGM7VVM8C",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

// export { auth, db };
export { auth, db };
export default firebaseApp;

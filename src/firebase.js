import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyBFachLEBWD50pmqHYVKIdKPmP1pGi0kb8",
    authDomain: "weather-app-b9809.firebaseapp.com",
    projectId: "weather-app-b9809",
    storageBucket: "weather-app-b9809.appspot.com",
    messagingSenderId: "401112044443",
    appId: "1:401112044443:web:dcf953cb4a1d30f3ef873e",
    measurementId: "G-6WL165TMYD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
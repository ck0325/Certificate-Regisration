import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth,  signOut  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO-Xq7Ldq5rXqtKHJvy3FSB4qCJUyVPrc",
  authDomain: "loginauth-82a4f.firebaseapp.com",
  projectId: "loginauth-82a4f",
  storageBucket: "loginauth-82a4f.appspot.com",
  messagingSenderId: "839624208104",
  appId: "1:839624208104:web:e66e3081ce68b07b2f235d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


document.getElementById('signout').addEventListener('click',function(){
    signOut(auth).then(() => {
      window.location.href='index.html'
    }).catch((error) => {
      alert(error)
    });

})




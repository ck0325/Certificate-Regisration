import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

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
const provider = new GoogleAuthProvider(app);


document.getElementById('reg-btn').addEventListener('click', function(){
    document.getElementById('register-div').style.display="inline";
    document.getElementById('login-div').style.display="none";


});
document.getElementById('log-btn').addEventListener('click', function(){
    document.getElementById('register-div').style.display="none";
    document.getElementById('login-div').style.display="inline";
});


document.getElementById("login-btn").addEventListener('click',function(){
    const loginEmail=document.getElementById("login-email").value;
    const loginPassword=document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    var res='Welcome back '+loginEmail+" login success";
    alert("You have successfully Logged In");
    window.location.href='home.html?result='+res;

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    alert(errorCode+" "+errorMessage);
   
  });
});


  document.getElementById("register-btn").addEventListener('click',function(){
    const registerEmail=document.getElementById("register-email").value;
    const registerPassword=document.getElementById("register-password").value;
    const reregisterPassword=document.getElementById("re-register-password").value;
    if(registerPassword==reregisterPassword){
      
    

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

   var res='Welcome '+registerEmail+" success";
   alert("Your Registration is successfull")
    window.location.href='home.html?result='+res;

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    alert(errorCode+" "+errorMessage)
   
  });
}

else{
  alert('please check the passwords');
}


});

document.getElementById('login-google').addEventListener('click',function(){

  // signInWithRedirect(auth, provider);
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    alert("Login Successfull")
    var res='Welcome back '+user.email+" login success";
    window.location.href='home.html?result='+res;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    alert(errorMessage)
  });
})



document.getElementById('register-google').addEventListener('click',function(){

  // signInWithRedirect(auth, provider);
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    alert("Registration Successfull")
    var res='Welcome '+user.email+" login success";
    window.location.href='home.html?result='+res;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    alert(errorMessage)
  });
})








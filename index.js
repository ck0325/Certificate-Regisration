import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, sendEmailVerification, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

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





//-------------------------------------------when user clicks on    "dont have an account?Register"-----------------------------------

document.getElementById('reg-btn').addEventListener('click', function(){
    document.getElementById('register-div').style.display="inline";
    document.getElementById('login-div').style.display="none";


});





//--------------------------------------------------when user clicks on   "have an account?Login"--------------------------------------

document.getElementById('log-btn').addEventListener('click', function(){
    document.getElementById('register-div').style.display="none";
    document.getElementById('login-div').style.display="inline";
});





//--------------------------------------------------------login using email/password.--------------------------------------------------

document.getElementById("login-btn").addEventListener('click',function(){
    const loginEmail=document.getElementById("login-email").value;
    const loginPassword=document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    if(auth.currentUser.emailVerified===true){   //If email verification is done then user is prometed to home page, else access denied.
    var res=loginEmail;
    alert("You have successfully Logged In");
    window.location.href='home.html?result='+res;
    }
    else{
      alert("Looks like you havent verified your mail address yet. please verify and come back.")
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    alert(errorCode+" "+errorMessage);
   
  });
});










//-----------------------------------------------------Register using email/password.--------------------------------------------------

document.getElementById("register-btn").addEventListener('click',function(){
    const registerEmail=document.getElementById("register-email").value;
    const registerPassword=document.getElementById("register-password").value;
    const reregisterPassword=document.getElementById("re-register-password").value;
    if(registerPassword==reregisterPassword){                                   //check if both passwords matches
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
     const result = userCredential.user;
     console.log(result);
    sendEmailVerification(auth.currentUser)                 //sends verification mail
  .then(() => {
    const request=new XMLHttpRequest();
    request.open("GET", "https://us-central1-send-email-487da.cloudfunctions.net/sendMail?dest="+registerEmail+"&type=welcome");
    request.send();                                                         //sending welcome mail
    request.onload=()=>{
      if(request.status===200){
        alert("Verification mail has been sent and welcome mail has been sent");
        alert("Kindly verify your mail address, so that you can login to our website")  //on successfull registration, login page is visible
        document.getElementById('register-div').style.display="none";
        document.getElementById('login-div').style.display="inline";

    }else{
      alert("Problem in sending welcome mail");
    }
  }
});

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







//--------------------------------------------------------Login using google-------------------------------------------------

document.getElementById('login-google').addEventListener('click',function(){
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(result);
    const user = result.user;
    alert(auth.currentUser.emailVerified)
    if(auth.currentUser.emailVerified===true){     
    alert("Login Successfull")
    var res=user.email;
    window.location.href='home.html?result='+res;
    }
    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    alert(errorMessage)
  });
})


//-----------------------------------------------------------register using google-------------------------------------------

document.getElementById('register-google').addEventListener('click',function(){
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(result);
    sendEmailVerification(auth.currentUser)
  .then(() => {
    const request=new XMLHttpRequest();
    request.open("GET", "https://us-central1-send-email-487da.cloudfunctions.net/sendMail?dest="+user.email);
    request.send();                          //welcome mail
    request.onload=()=>{
      if(request.status===200){
        alert("Welcome mail sent to "+user.email);
        alert("As, you register using google you are automatically signed-in")
        var res=user.email;
        window.location.href='home.html?result='+res;        

      }else{
        alert("Error in sending mail");
      }
      
    }
  })
      
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    alert(errorMessage)
  });
})








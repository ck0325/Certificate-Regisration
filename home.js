import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth,  signOut  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import{getFirestore, query,where, doc, getDoc,getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
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
const db=getFirestore();



var result=document.getElementById('msg').innerHTML;


const querySnapshot = await getDocs(collection(db, result ));
var count=0;
querySnapshot.forEach((doc) => {
  count=count+1;
  console.log(`${doc.id} => ${doc.data().certificationid}`);
  
  let row=`<tr data-id=${doc.id}>
           <td>${doc.data().certificationid}</td>
           <td>${doc.data().certificationlevel}</td>
           <td>${doc.data().certificationname}</td>
           <td>${doc.data().certificationtype}</td>
           <td>${doc.data().dateofcertification}</td>
           <td>${doc.data().expiryofcertification}</td>
           <td>${doc.data().validity}</td>
           <td class=${'delete'}>${'x'}</td>
  </tr>
  `;
  let table=document.getElementById("mytable");
  table.innerHTML+=row;
});
if(count===0){
  var m="No certifications added. Please add one"
let row=`<tr>

<td>${m}</td>

</tr>`;
let table=document.getElementById("mytable");
table.innerHTML+=row;
}

document.querySelector('#table')
  .addEventListener('click', async (ev) => {
    
    const z=ev.target.parentElement.getAttribute('data-id');
    alert(z);
    var ref = doc(db,result,z);
    const docSnap = await getDoc(ref);
    await deleteDoc(ref)
    .then(()=>{
                        alert("Data Deleted successfully");

                        const request=new XMLHttpRequest();
                        request.open("GET", "https://us-central1-send-email-487da.cloudfunctions.net/sendMail?dest="+result+"&type=delete");
                        request.send();                                                         //sending welcome mail
                        request.onload=()=>{
                          if(request.status===200){
                            alert("Certification deletion mail has been sent");
                    
                        }else{
                          alert("Problem in sending welcome mail");
                        }
                      }
    })
    .catch((error)=>{
                        alert("Unsuccessful operationn,error:"+error);
      });

     // window.setTimeout( window.location.reload(),10000);
     setTimeout(function(){ window.location.reload();},5000)
      });





document.getElementById('signout').addEventListener('click',function(){
    signOut(auth).then(() => {
      window.location.href='index.html'
    }).catch((error) => {
      alert(error)
    });

})

document.getElementById('addcerts').addEventListener('click',function(){
  window.location.href='detailsform.html?result='+result;
})



var mySelect = document.getElementById('cert-type');
mySelect.onchange = async (event) => 
{
  if(event.target.value!=0){
    document.getElementById('mytable').innerHTML="";
    var count1=0;
    var inputText = event.target.value;
    console.log(inputText);
    const q = query(collection(db, result), where("certificationtype", "==", inputText));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
     
  let row=`<tr data-id=${doc.id}>
  <td>${doc.data().certificationid}</td>
  <td>${doc.data().certificationlevel}</td>
  <td>${doc.data().certificationname}</td>
  <td>${doc.data().certificationtype}</td>
  <td>${doc.data().dateofcertification}</td>
  <td>${doc.data().expiryofcertification}</td>
  <td>${doc.data().validity}</td>
  <td class=${'delete'}>${'x'}</td>
</tr>
`;
let table=document.getElementById("mytable");
table.innerHTML+=row;
    count1=count1+1;
});
if(count1===0){
  var a=`No certifications of ${event.target.value}. Please add one`
let row=`<tr>

<td>${a}</td>

</tr>`;
let table=document.getElementById("mytable");
table.innerHTML+=row;
}
}
else{
  document.getElementById('mytable').innerHTML="";
  const querySnapshot = await getDocs(collection(db, result ));
var count=0;
querySnapshot.forEach((doc) => {
  count=count+1;
  console.log(`${doc.id} => ${doc.data().certificationid}`);
  
  let row=`<tr data-id=${doc.id}>
           <td>${doc.data().certificationid}</td>
           <td>${doc.data().certificationlevel}</td>
           <td>${doc.data().certificationname}</td>
           <td>${doc.data().certificationtype}</td>
           <td>${doc.data().dateofcertification}</td>
           <td>${doc.data().expiryofcertification}</td>
           <td>${doc.data().validity}</td>
           <td class=${'delete'}>${'x'}</td>
  </tr>
  `;
  let table=document.getElementById("mytable");
  table.innerHTML+=row;
});
if(count===0){
  var m="No certifications added. Please add one"
let row=`<tr>

<td>${m}</td>

</tr>`;
let table=document.getElementById("mytable");
table.innerHTML+=row;
}
}  
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth,  signOut  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import{getFirestore, query,where, doc, getDoc,getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import {getStorage, ref as sref, uploadBytesResumable, getDownloadURL, deleteObject} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";

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

const storage=getStorage();




var result=document.getElementById('msg').innerHTML;        

window.onload = function() {
  getDetails()
};


//------------------------------------------------------Getting users certificate details through firestore and storage-----------------------------
 async function getDetails(){
const querySnapshot = await getDocs(collection(db, result ));
var count=0;
querySnapshot.forEach((doc) => {
  count=count+1;
  console.log(`${doc.id} => ${doc.data().certificationid}`);

  const starsRef = sref(storage,  result+'/'+doc.id);
  getDownloadURL(starsRef)
  .then((url) => {
  
    
    let row=`<tr data-id=${doc.id}>
             <td>${doc.data().certificationid}</td>
             <td>${doc.data().certificationlevel}</td>
             <td>${doc.data().certificationname}</td>
             <td>${doc.data().certificationtype}</td>
             <td>${doc.data().dateofcertification}</td>
             <td>${doc.data().expiryofcertification}</td>
             <td>${doc.data().validity}</td>
             <td><a href=${url}>click here</a></td>
             <td class=${'delete'}>${'x'}</td>
    </tr>
    `;
    let table=document.getElementById("mytable");
    table.innerHTML+=row;
  })
  .catch((error) => {
    
  });

});
if(count===0){
  var m="No certifications added. Please add one"        //if there are no certificates
let row=`<tr>

<td>${m}</td>

</tr>`;
let table=document.getElementById("mytable");
table.innerHTML+=row;
}
}

var popup=document.getElementById("popup")

//---------------------------------------------Deletion of certificates--------------------------------------------------------------------

document.querySelector('#table')
  .addEventListener('click', async (ev) => {
    const [x, y] = [
      ev.target.cellIndex, 
      ev.target.parentElement.rowIndex
    ];

    if(x==8){
    const z=ev.target.parentElement.getAttribute('data-id');
   // alert(z);
    var ref = doc(db,result,z);
    const docSnap = await getDoc(ref);
    await deleteDoc(ref)
    .then(()=>{
                      //  alert("Data Deleted successfully");

                        const request=new XMLHttpRequest();
                        request.open("GET", "https://us-central1-send-email-487da.cloudfunctions.net/sendMail?dest="+result+"&type=delete");
                        request.send();                                                         //sending welcome mail
                        request.onload=()=>{
                          if(request.status===200){
                            //alert("Certification deletion mail has been sent");
                    
                        }else{
                         // alert("Problem in sending welcome mail");
                        }
                      }
    })
    .catch((error)=>{
                        //alert("Unsuccessful operationn,error:"+error);
      });

      
      const desertRef = sref(storage, result+'/'+z);
      await deleteObject(desertRef).then(() => {
        //alert('file deleted')
      }).catch((error) => {
       // alert(error)
      });

     
     popup.classList.add("open-popup")
      
      document.getElementById("ok").addEventListener('click',function(){
        popup.classList.remove("open-popup")
        
        window.location.reload();
      })
    }
      });
    
    


//----------------------------------------------------Signout-------------------------------------------------------------------------

document.getElementById('signout').addEventListener('click',function(){
    signOut(auth).then(() => {
      window.location.href='index.html'
    }).catch((error) => {
      alert(error)
    });

})


//-------------------------------------------------Add certifications page------------------------------------------------------------

document.getElementById('addcerts').addEventListener('click',function(){
  window.location.href='detailsform.html?result='+result;
})


//------------------------------------------------------Searching -------------------------------------------------------------------


document.getElementById('search').addEventListener('input',async function(){
  var inputtext=document.getElementById('search').value;
  if(inputtext.length>=1){
    document.getElementById('none').style.display="inline";
    document.getElementById('filter').innerHTML="";
  console.log(inputtext);
  let ele1=document.getElementById('filter');
  let h1 = ele1.getAttribute("hidden");
  if (h1) {
    ele1.removeAttribute("hidden");
 } else {
 }

 let ele2=document.getElementById('mytable');
 let h2 = ele2.getAttribute("hidden");
 if (h2) {
} else {
  ele2.setAttribute("hidden","hidden")
}



 
    let count1=0;
    const q1 = query(collection(db, result), where("certificationid", "==", inputtext));
    const q2 = query(collection(db, result), where("certificationlevel", "==", inputtext));
    const q3 = query(collection(db, result), where("certificationtype", "==", inputtext));
    const q4 = query(collection(db, result), where("certificationname", "==", inputtext));
    const a1=await getDocs(q1);
    const a2= await getDocs(q2);
    const a3= await getDocs(q3);
    const a4= await getDocs(q4);
    
    a1.forEach((doc)=>{
      const starsRef = sref(storage,  result+'/'+doc.id);
      getDownloadURL(starsRef)
      .then((url) => {
     
      let row=`<tr data-id=${doc.id}>
   <td>${doc.data().certificationid}</td>
   <td>${doc.data().certificationlevel}</td>
   <td>${doc.data().certificationname}</td>
   <td>${doc.data().certificationtype}</td>
   <td>${doc.data().dateofcertification}</td>
   <td>${doc.data().expiryofcertification}</td>
   <td>${doc.data().validity}</td>
   <td><a href=${url}>click here</a></td>
   <td class=${'delete'}>${'x'}</td>
 </tr>
 `;
 count1=1;
 document.getElementById('none').style.display="none";
 let table=document.getElementById("filter");
 table.innerHTML+=row;
     
    })
    .catch((error) => {
      
    });
    })

    a2.forEach((doc)=>{
      const starsRef = sref(storage,  result+'/'+doc.id);
      getDownloadURL(starsRef)
      .then((url) => {
     
      let row=`<tr data-id=${doc.id}>
   <td>${doc.data().certificationid}</td>
   <td>${doc.data().certificationlevel}</td>
   <td>${doc.data().certificationname}</td>
   <td>${doc.data().certificationtype}</td>
   <td>${doc.data().dateofcertification}</td>
   <td>${doc.data().expiryofcertification}</td>
   <td>${doc.data().validity}</td>

   <td><a href=${url}>click here</a></td>
   <td class=${'delete'}>${'x'}</td>
 </tr>
 `;
 count1=1;
 document.getElementById('none').style.display="none";
 let table=document.getElementById("filter");
 table.innerHTML+=row;
  
    })
    .catch((error) => {
      
    });
    
    })

    a3.forEach((doc)=>{
      const starsRef = sref(storage,  result+'/'+doc.id);
      getDownloadURL(starsRef)
      .then((url) => {
     
      let row=`<tr data-id=${doc.id}>
   <td>${doc.data().certificationid}</td>
   <td>${doc.data().certificationlevel}</td>
   <td>${doc.data().certificationname}</td>
   <td>${doc.data().certificationtype}</td>
   <td>${doc.data().dateofcertification}</td>
   <td>${doc.data().expiryofcertification}</td>
   <td>${doc.data().validity}</td>

   <td><a href=${url}>click here</a></td>
   <td class=${'delete'}>${'x'}</td>
 </tr>
 `;
 document.getElementById('none').style.display="none";
 count1=1;
 let table=document.getElementById("filter");
 table.innerHTML+=row;
     
    })
    .catch((error) => {
      
    });
    
    })
    a4.forEach((doc)=>{
      const starsRef = sref(storage,  result+'/'+doc.id);
      getDownloadURL(starsRef)
      .then((url) => {
     
      let row=`<tr data-id=${doc.id}>
   <td>${doc.data().certificationid}</td>
   <td>${doc.data().certificationlevel}</td>
   <td>${doc.data().certificationname}</td>
   <td>${doc.data().certificationtype}</td>
   <td>${doc.data().dateofcertification}</td>
   <td>${doc.data().expiryofcertification}</td>
   <td>${doc.data().validity}</td>

   <td><a href=${url}>click here</a></td>
   <td class=${'delete'}>${'x'}</td>
 </tr>
 `;
 document.getElementById('none').style.display="none";
 count1=1;
 let table=document.getElementById("filter");
 table.innerHTML+=row;
     
    })
    .catch((error) => {
      
    });
    
    })

    
      



}
else{
  document.getElementById('none').style.display="none";
  let ele1=document.getElementById('filter');
  let h1 = ele1.getAttribute("hidden");
  if (h1) {
 } else {
    ele1.setAttribute("hidden", "hidden");
 }

 let ele2=document.getElementById('mytable');
 let h2 = ele2.getAttribute("hidden");
 if (h2) {
  ele2.removeAttribute("hidden")
} else {
}

}
})




const themeDots = document.getElementsByClassName('theme-dot');
const theme = document.getElementById('theme-style');
const setTheme = (mode) => {
  switch(mode){
      case "light":
          theme.href = "styles.css";
          break;
      case "blue" :
          theme.href = "blue.css";
          break;
      case "green":
          theme.href = "green.css";
          break;
      case "purple":
          theme.href = "purple.css"
          break;
      default:
          theme.href = "styles.css"
  }

  localStorage.setItem('theme', mode);
}
let themeStyle = localStorage.getItem('theme');
if(themeStyle == null){
    setTheme('light')
}
else(setTheme(themeStyle));
for(let i=0 ; i<themeDots.length;i++){
    themeDots[i].addEventListener('click', (e) => {
        let mode = e.target.dataset.mode;
        setTheme(mode);
    } )
}

// contact details btn
const contacts = document.querySelector('.contact-details');
document.querySelector("#contact-btn").addEventListener('click', () => {
  if(!contacts.classList.contains('contact-details-show'))
   contacts.classList.add('contact-details-show');
 else
   contacts.classList.remove('contact-details-show')
})

// firebase initialiser
const firebaseInit = () => {
const firebaseConfig = {
    apiKey: "AIzaSyBopHCH8nX3MhLMXrMDmka3JeFONoQdEDw",
    authDomain: "portfolio-rohan-eb318.firebaseapp.com",
    projectId: "portfolio-rohan-eb318",
    storageBucket: "portfolio-rohan-eb318.appspot.com",
    messagingSenderId: "246436480605",
    appId: "1:246436480605:web:ab23fad835f0339df36fb4"
 };
 firebase.initializeApp(firebaseConfig)
}
firebaseInit();

// create firestore
const db = firebase.firestore();

const form = document.getElementById('contact-form');
const inputs = document.getElementsByClassName("input-field");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const [{value:name}, {value:subject}, {value:email}, {value:message}] = inputs;
    if(!name||!email||!subject||!message){
        toggleInfo({message:'Please fill all the fields', error:true});
        setTimeout(toggleInfo,3000);
        return;
    }
     const user = {
       name,
       subject,
       email,
       message
    }

    startLoading();

    console.log(db)
    db.collection("users").add(user)
     .then((docRef) => {
       toggleInfo({message:"Thanks for your response",error:false});
        setTimeout(toggleInfo,3000);
         resetInputs();
         stopLoading();
    })
   .catch((error) => {
    toggleInfo({message:"Please Try again",error:true});
     setTimeout(toggleInfo,3000);
     stopLoading();
   });

  
    
    
})

function resetInputs(){
    inputs[0].value="";
    inputs[1].value="";
    inputs[2].value="";
    inputs[3].value="";
}

function toggleInfo(infoObj={}){
const info = document.querySelector('.info');
if(!infoObj.message){
  info.textContent = "";
  info.style.display = "none"; 
  return;
}
  info.textContent = infoObj.message;
  info.style.display = "block";
  info.style.backgroundColor = infoObj.error?" rgb(255, 140, 119)":"rgb(101, 247, 137)";
}

function startLoading(){
    const loading = document.querySelector('.loading');
    loading.classList.add('loader');
}
function stopLoading(){
    const loading = document.querySelector('.loading');
    loading.classList.remove('loader');
}


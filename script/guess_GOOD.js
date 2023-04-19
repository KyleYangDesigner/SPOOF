/*--------------- Setup - Firebase -------------*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyAS_xn4bBKBHKGKN42sMmFLwiN7Cs2B0nU",
  authDomain: "spoof-5e4ba.firebaseapp.com",
  databaseURL: "https://spoof-5e4ba-default-rtdb.firebaseio.com",
  projectId: "spoof-5e4ba",
  storageBucket: "spoof-5e4ba.appspot.com",
  messagingSenderId: "561624489946",
  appId: "1:561624489946:web:45ff71f1b0ae8209d26ae3",
  measurementId: "G-KJG4WMVYS8"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/*--------------- Read Data - Guesser -------------*/

async function readSpinData(){
  const dbRef = ref(getDatabase());
  const response = await get(child(dbRef, `spinData/1`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());              // writes prompt as value -------// object(i) is "Correct prompt" if correct and {value: 'Correct prompt'} if not correct
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return response;
}

/*--------------- Write Data - Player -------------*/

function writeSpinData(value) {
  const db = getDatabase();
  set(ref(db, 'spinData/' + 1), {
    value
  });
  }

  document.getElementById("guessForm").addEventListener("submit", function(e){
    e.preventDefault();
    let x = document.forms["guessForm"]["text-input"].value;   //  let x be the text inputted
    readSpinData().then(function (response){                   //  access db and get value
      console.log(x);                                          //  writes x (user input?) to log
      console.log(response);                                   //  writes PROMPT as value ----- // object (i) and value = "Correct prompt" if correct and {value: 'Correct prompt'} if not correct
      if (x == response.value) {                               //  if text inputted is equal to the value of the the PROMPT 
        alert("Correct");
        return true;
      }
      else {
        alert("NotCorrect");

        const wrongGuess = document.querySelector('#wrong');
        let li = document.createElement('li');
        li.textContent = x;
        wrongGuess.appendChild(li);
      }

    })
  });
import axios from 'axios';
import firebase from 'firebase';



var config = {
  apiKey: "AIzaSyDVu1y_aQRqWwVtPrWG3pja-KwO2F18Ahg",
  authDomain: "my-skills-b62f7.firebaseapp.com",
  databaseURL: "https://my-skills-b62f7.firebaseio.com",
  projectId: "my-skills-b62f7",
  storageBucket: "my-skills-b62f7.appspot.com",
  messagingSenderId: "398652311383"
};


export const loginAction = (email, password) => dispatch => {
 
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }



  firebase.auth().signInWithEmailAndPassword(email, password).then(function(data) {
   localStorage.setItem('token', firebase.auth().currentUser.qa);

   let payload =  {
    token: firebase.auth().currentUser.qa
  };

    dispatch({ type: 'LOGIN_SUCCESS', payload: payload });
    
  }).catch(function(error) {
    dispatch({ type: 'LOGIN_ERROR' });
  });

  

}

export function checkAuthAction() {
  
    let token = localStorage.getItem('token');
    return { 
      type: 'CHECK_AUTH', 
      payload: {
        token: token === null ? "" : token
      }
    }
   
   
}

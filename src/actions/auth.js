import axios from 'axios';
import firebase from 'firebase';


axios.interceptors.request.use((config)=>{  
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

var config = {
  apiKey: "AIzaSyBYUcC7uW6MsyKH4iDPKrnL5slUId1Hbs8",
  authDomain: "yourskills-346f1.firebaseapp.com",
  databaseURL: "https://yourskills-346f1.firebaseio.com",
  projectId: "yourskills-346f1",
  storageBucket: "yourskills-346f1.appspot.com",
  messagingSenderId: "610815753439"
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

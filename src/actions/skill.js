import axios from 'axios';
import { setInterval } from 'timers';




axios.interceptors.request.use((config)=>{  
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = `application/json`;
  return config;
});

axios.interceptors.response.use(
  function(response){
    return response
    }, function (error){
      if (401 === error.response.status){  
        localStorage.removeItem('token');
        window.location.reload()
    }
  } 
); 


export const getSkillsAction = () => dispatch => {

  axios.get('http://localhost:3010/skills', {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_SKILLS', payload: response['data'] });
  })
  .catch(function (error) {  
  });
    
}

export const getIdCategoriesAction = () => dispatch => {

  axios.get('http://localhost:3010/skills/categories', {})
  .then(function (response) {
    dispatch({ type: 'GET_ID_SKILLS', payload: response['data'] });
  })
  .catch(function (error) {  
  });

}

export const editSkillsAction = (skill) => dispatch => {
  axios.put('http://localhost:3010/skills', skill)
  .then(function (response) {
  })
  .catch(function (error) {
  });

}



export const createSkillsAction = (skill) => dispatch => {

  axios.post('http://localhost:3010/skills', skill)
  .then(function (response) {
    axios.get('http://localhost:3010/skills', {})
    .then(function (response) {
      dispatch({ type: 'SUCCES_GET_SKILLS', payload: response['data'] });
    })
  })
  .catch(function (error) {
  });

}
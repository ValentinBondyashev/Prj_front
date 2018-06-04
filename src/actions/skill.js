import axios from 'axios';
import { setInterval } from 'timers';


axios.interceptors.request.use((config)=>{  
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = `application/json`;
  return config;
});




export const getSkillsAction = () => dispatch => {

      axios.get('http://35.229.107.112/skills/', {})
      .then(function (response) {
  
        dispatch({ type: 'SUCCES_GET_SKILLS', payload: response['data'] });
      })
      .catch(function (error) {
        
      });
    
}

export const editSkillsAction = (skill) => dispatch => {

  axios.put('http://35.229.107.112/skills/', skill)
  .then(function (response) {

    dispatch({ type: 'SUCCES_PUT_SKILLS', payload: response['data'] });
  })
  .catch(function (error) {
    
  });

}
import axios from "axios";
import { _ } from "lodash";
export const API_URL = `http://localhost:${process.env.REACT_APP_API_PORT}`;
export const USER = "user";

export const  getRquest = async (_url) => {
  let currentUser;

  if(localStorage[USER]){
    currentUser= JSON.parse(localStorage[USER]);
} 
  
  try {
    let resp = await axios.get(_url, {
      headers: {
        user_name: currentUser.name,
        user_mispar_ishi: currentUser.password
      },
    });
    return resp;
  } catch (err) {
    throw err;
  }
};

// For Post,delete, put, patch
export const  Method = async (_url, _method, _body = {}, _headers= {}) => {

  try {
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
      headers: _headers,
    });
    return resp;
  } catch (err) {
    throw err;
  }
};
import axios from "axios";
import { _ } from "lodash";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
export const API_URL = "http://localhost:3001";
export const USER = "user";

export const doApiGet = async (_url) => {
  let currentUser = JSON.parse(localStorage[USER]);
  
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
export const doApiMethod = async (_url, _method, _body = {}) => {
  try {
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
      headers: {
        user_name: _body.name,
        user_mispar_ishi: _body.password

      },
    });
    return resp;
  } catch (err) {
    throw err;
  }
};
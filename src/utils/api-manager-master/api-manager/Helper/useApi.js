// useApi.js
import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../secure-route-master/secure-route/AuthContext';
import global from '../../../config/Global.json';


const useApi = () => {
  const getAPI = (API_NAME) => global.api.host + global.api[API_NAME];

  const getHost = () => global.api.host;

  const { authToken } = useContext(AuthContext);
  let token = authToken.access;

  const Post = async (api, payload) => {
    let _api =(getAPI(api).includes('undefined'))?api:getAPI(api);
    try {
      const response = await axios.post(_api, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Put = async (api, id, payload) => {
    let _api =(getAPI(api).includes('undefined'))?api:getAPI(api);
    try {
      const response = await axios.put(`${_api}${id}/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Patch = async (api, id, payload) => {
    let _api =(getAPI(api).includes('undefined'))?api:getAPI(api);
    try {
      const response = await axios.patch(`${_api}${id}/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Get = async (api) => {
    let _api =(getAPI(api).includes('undefined'))?api:getAPI(api);
    try {
      const response = await axios.get(_api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const Delete = async (api, id) => {
    let _api =(getAPI(api).includes('undefined'))?api:getAPI(api);
    try {
      const response = await axios.delete(`${_api}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  return { Post, Put, Patch, Get, Delete, getAPI, getHost };
};

export default useApi;

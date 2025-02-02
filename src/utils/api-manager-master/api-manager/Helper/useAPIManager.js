import axios from "axios";

const useAPIManager = (globalConfig, _token) => {
  const authToken = _token;
  const global = globalConfig;

  let token = authToken.access;
  let authorization = _token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const getAPI = (API_NAME) => global.api.host + global.api[API_NAME];
  
  const getHost = () => global.api.host;

  const Post = async (api, payload) => {
    let _api = getAPI(api).includes("undefined") ? api : getAPI(api);
    try {
      const response = await axios.post(_api, payload, authorization);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Put = async (api, id, payload) => {
    let _api = getAPI(api).includes("undefined") ? api : getAPI(api);
    try {
      const response = await axios.put(`${_api}${id}/`, payload, authorization);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Patch = async (api, id, payload) => {
    let _api = getAPI(api).includes("undefined") ? api : getAPI(api);
    try {
      const response = await axios.patch(
        `${_api}${id}/`,
        payload,
        authorization
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  const Get = async (api) => {
    let _api = getAPI(api).includes("undefined") ? api : getAPI(api);
    try {
      const response = await axios.get(_api, authorization);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const Delete = async (api, id) => {
    let _api = getAPI(api).includes("undefined") ? api : getAPI(api);
    try {
      const response = await axios.delete(`${_api}${id}/`, authorization);
      return response;
    } catch (err) {
      throw err;
    }
  };

  return { Post, Put, Patch, Get, Delete, getAPI, getHost };
};

export default useAPIManager;

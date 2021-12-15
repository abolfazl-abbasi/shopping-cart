import axios from "axios";

// step 1 : npm i || npm i --save json-server

// step 2 : json-server --watch data/db.json --port 3001

// Finish

axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
  }
);

import axios from "axios";

axios.defaults.baseURL = "http://localhost";
if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

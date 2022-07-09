import axios from 'axios'

const baseURL = "https://api.themoviedb.org/3";


export const apiHelper = axios.create({
  baseURL
});
export const apiKEY = "a9db832a40cc4fc21466430649b69a2e";
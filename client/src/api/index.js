import axios from "axios";

const DEV_MODE = false;
export const projectCode = "stack-rea-nod-v0";

const DEV_URL = "http://localhost:5000";
const PROD_URL = "https://api.allenbenny.site";

export const BACKEND_URL = (DEV_MODE ? DEV_URL : PROD_URL) + "/" + projectCode;

const API = axios.create({ baseURL: BACKEND_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/api/user/login", authData);
export const signUp = (authData) => API.post("/api/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/api/questions/Ask", questionData);

export const getAllQuestions = () => API.get("/api/questions/get");

export const deleteQuestion = (id) => API.delete(`/api/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/api/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/api/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/api/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/api/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/api/user/update/${id}`, updateData);

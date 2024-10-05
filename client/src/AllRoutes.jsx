import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Questions from "./Pages/Questions/Questions";
import AskQuestions from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";

import { projectCode } from "./api";

const Routs = () => {
  return (
    <Routes>
      <Route path={`/${projectCode}`} element={<Home />} />
      <Route path={`/${projectCode}/Auth`} element={<Auth />} />
      <Route path={`/${projectCode}/AskQuestion`} element={<AskQuestions />} />
      <Route path={`/${projectCode}/Questions`} element={<Questions />} />
      <Route
        path={`/${projectCode}/Questions/:id`}
        element={<DisplayQuestion />}
      />
      <Route path={`/${projectCode}/Tags`} element={<Tags />} />
      <Route path={`/${projectCode}/Users`} element={<Users />} />
      <Route path={`/${projectCode}/Users/:id`} element={<UserProfile />} />
    </Routes>
  );
};
export default Routs;

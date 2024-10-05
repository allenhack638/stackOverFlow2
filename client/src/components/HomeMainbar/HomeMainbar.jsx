import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList.jsx";
import toast from "react-hot-toast";
import { projectCode } from "../../api/index.js";

function HomeMainbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const questionsList = useSelector((state) => state.questionsReducer);
  const User = useSelector((state) => state.currentUserReducer);
  const checkAuth = () => {
    if (User === null) {
      toast.error("Login or Signup to ask a question");
    } else {
      navigate(`/${projectCode}/AskQuestion`); // Updated to include project code
    }
  };
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading....</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
}
export default HomeMainbar;

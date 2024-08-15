import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";
import toast from "react-hot-toast";

function AskQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const User = useSelector((state) => state.currentUserReducer);

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  useEffect(() => {
    if (!User?.result?._id) {
      navigate(-1);
    }
  }, [User, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!questionTitle.trim() || !questionBody.trim() || !questionTags.trim()) {
      toast.error("Please fill all the fields");
      return;
    }
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags: questionTags.split(" "),
          userPosted: User.result.name,
          userId: User?.result?._id,
        },
        navigate
      )
    );
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                value={questionTitle}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                value={questionBody}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Max 5 tags. Separate with spaces.</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value);
                }}
                value={questionTags}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
            disabled={
              !questionTitle.trim() ||
              !questionBody.trim() ||
              !questionTags.trim()
            }
          />
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;

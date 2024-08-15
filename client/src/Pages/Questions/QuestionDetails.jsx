import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question";
import copy from "copy-to-clipboard";

import toast from "react-hot-toast";

const QuestionDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);

  const [Answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const location = useLocation();

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      toast.error("Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (Answer === "") {
        toast.error("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
            userId: User.result._id,
          })
        );
      }
    }
  };

  const handleShare = () => {
    const fullUrl = `${window.location.origin}${location.pathname}`;
    copy(fullUrl);
    toast.success("Copied to clipboard");
  };

  const handleDelete = () => {
    if (!User) {
      toast.error("Login or Signup to delete a question");
      navigate("/Auth");
      return;
    }
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    if (!User) {
      toast.error("Login or Signup to vote a question");
      return;
    }
    dispatch(voteQuestion(id, "upVote", User.result._id));
  };

  const handleDownVote = () => {
    if (!User) {
      toast.error("Login or Signup to vote a question");
      return;
    }
    dispatch(voteQuestion(id, "downVote", User.result._id));
  };
  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className=" question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag, index) => (
                          <p key={index}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                          >
                            <Avatar
                              backgroundColor="orange"
                              height={"35px"}
                              width={"30px"}
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <div>
                    <h3>Your Answer</h3>
                    {!User && <span> Login to Answer</span>}
                  </div>
                  <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                      setAnswer("");
                    }}
                  >
                    <textarea
                      name=""
                      id="post-ans-textarea"
                      cols="30"
                      rows="10"
                      value={Answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={User === null}
                    ></textarea>
                    <br />
                    <input
                      type="Submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                      disabled={User === null}
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag, index) => (
                      <Link to="/Tags" key={index} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to={User === null ? "#" : "/AskQuestion"}
                      className={`write-question-link ${
                        User === null ? "disabled-link" : ""
                      }`}
                      aria-disabled={User === null ? "true" : "false"}
                      data-tooltip={
                        User === null ? "Please log in to ask a question." : ""
                      }
                    >
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetails;

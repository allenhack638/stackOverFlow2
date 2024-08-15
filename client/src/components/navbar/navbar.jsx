import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";

import Logo from "../../assets/logo.png";
import Search from "../../assets/magnifying-glass-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import "../../components/navbar/navbar.css";
import { setCurrentUser } from "../../actions/currentUser";
import Fuse from "fuse.js"; // Import Fuse.js

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  var User = useSelector((state) => state.currentUserReducer);
  const questionsList = useSelector((state) => state.questionsReducer);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!questionsList?.data?.length) {
      return;
    }

    const fuse = new Fuse(questionsList.data, {
      keys: ["questionTitle"],
      threshold: 0.0,
    });

    const results = fuse.search(query);

    if (!results.length) {
      return;
    }

    const filteredIds = new Set(results.map((result) => result.item._id));

    const shuffledQuestions = questionsList.data.reduce(
      (acc, question) => {
        if (filteredIds.has(question._id)) {
          acc.filtered.push(question);
        } else {
          acc.remaining.push(question);
        }
        return acc;
      },
      { filtered: [], remaining: [] }
    );

    // Dispatch the combined list with filtered questions on top
    dispatch({
      type: "FETCH_ALL_QUESTIONS",
      payload: [...shuffledQuestions.filtered, ...shuffledQuestions.remaining],
    });
  };

  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo">
          <img src={Logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Home
        </Link>
        {/* <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link> */}
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch} // Handle the search on input change
          />
          <img src={Search} alt="search" width="18px" className="icon" />
        </form>
        {User === null ? (
          <Link to="/Auth" className="nav-item nav-links">
            Log in
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              width={"35px"}
              height={"35px"}
              borderRadius="50%"
              color="white"
            >
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0",
                  lineHeight: "0",
                }}
              >
                {User.result.name.charAt(0).toUpperCase()}
              </Link>
            </Avatar>
            <button className="nav-item nav-links" onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/StartingPage.css";

const StartingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/"); // Redirect to the Login page
  };

  return (
    <div className="starting-page">
      <header className="header">
        <h1 className="brand-name">KLE Tech Blogging Platform</h1>
      </header>
      <main className="main-content">
        <div className="intro-text">
          <h2>Discover. Connect. Inspire.</h2>
          <p>
            Welcome to the official blogging platform for the KLE Tech students community! 
            Share your ideas, connect with peers, and explore a world of creativity and innovation. 
            Whether you're passionate about technology, art, storytelling, or research, this platform is your stage.
          </p>
          <p>
            Join us to ignite meaningful discussions, collaborate on projects, and make your voice heard in the KLE Tech ecosystem.
          </p>
        </div>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </main>
      <footer className="footer">
        <p>&copy; 2024 KLE Tech Blogging Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StartingPage;

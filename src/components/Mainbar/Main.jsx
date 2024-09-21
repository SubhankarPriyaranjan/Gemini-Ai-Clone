import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData, // This will be a string with headings and content
    setInput,
    input,
  } = useContext(Context);

  // Parse resultData and format lines as bullet points
  const parseResultData = () => {
    if (!resultData) return null;

    // Split the resultData into lines based on newline characters (\n)
    const lines = resultData.split('\n').filter(line => line.trim() !== '');

    return (
      <ul className="result-list">
        {lines.map((line, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: line }} />
        ))}
      </ul>
    );
  };

  return (
    <div className="main">
      {/* Navigation Bar */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      {/* Main Container */}
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <div className="parsed-result">{parseResultData()}</div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p>
                <span>Hello, Friend.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
          </>
        )}

        {/* Bottom Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => e.key === 'Enter' && input && onSent()}
            />
            <div>
              <img src={assets.gallery_icon} width={30} alt="Gallery" />
              <img src={assets.mic_icon} width={30} alt="Mic" />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  width={30}
                  alt="Send"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

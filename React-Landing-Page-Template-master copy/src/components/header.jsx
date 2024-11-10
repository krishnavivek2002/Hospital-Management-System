import React from "react";

export const Header = (props) => {
  const fadeInOutStyle = {
    animation: "fadeInOut 3s ease-in-out infinite",
  };

  return (
    <header id="header">
      <style>{`
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        #header {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }
        #header video {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
      `}</style>

      {/* Video background */}
      <video autoPlay muted loop>
        <source src="path_to_your_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay and content */}
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1 style={fadeInOutStyle}>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

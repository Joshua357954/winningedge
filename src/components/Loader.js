import React from "react";

// Loader component with styles
const Loader = ({ loading }) => {
  if (loading) {
    return (
      <section
        className="d-flex w-100 vh-100 position-fixed top-0 left-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <div className="loader"></div>

        <style jsx>{`
         .loader {
            --d:22px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            color: #25b09b;
            box-shadow: 
              calc(1*var(--d))      calc(0*var(--d))     0 0,
              calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
              calc(0*var(--d))      calc(1*var(--d))     0 2px,
              calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
              calc(-1*var(--d))     calc(0*var(--d))     0 4px,
              calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
              calc(0*var(--d))      calc(-1*var(--d))    0 6px;
            animation: l27 1s infinite steps(8);
          }
          @keyframes l27 {
            100% {transform: rotate(1turn)}
          }
        `}</style>
      </section>
    );
  }

  return null; // Return nothing if not loading
};

export default Loader;



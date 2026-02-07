"use client";
export default function Loader() {
  const text = "IDSHOPCASE";

  return (
    <div className="container">
      <div className="loader">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="char"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap");

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #fff;
          font-family: "Fredoka", sans-serif;
        }

        .loader {
          display: flex;
          gap: 5px;
        }

        .char {
          font-size: 40px;
          font-weight: 800;
          color: #000;
          animation: jump 1.5s infinite ease-in-out;
          transform-origin: bottom center;
        }

        @keyframes jump {
          0%,
          100% {
            transform: scale(1, 1) translateY(0);
          }
          10% {
            transform: scale(1.1, 0.9);
          }
          30% {
            transform: scale(0.9, 1.1) translateY(-30px);
          }
          50% {
            transform: translateY(-30px);
          }
          70% {
            transform: scale(1.1, 0.9);
          }
        }
      `}</style>
    </div>
  );
}

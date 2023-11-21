import React from "react";

const Modal = ({ onClose, open, bestTime, numOfRolls }) => {
  return (
    <div
      onClick={onClose}
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  "
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        <div className="flex flex-col justify-around items-center gap-4">
          <img src="https://img.icons8.com/bubbles/200/000000/trophy.png"></img>
          <h2 className="font-black">Congratulations !</h2>
          <p className="text-rose-700 font-mono	">You won</p>
          <div className="">
            <h2 className="font-mono">
              Completed in :{" "}
              <span
                className="p-1 rounded text-white"
                style={{
                  background:
                    "linear-gradient(315deg, hsla(202, 80%, 24%, 1) 12%, hsla(27, 96%, 61%, 1) 87%, hsla(31, 97%, 72%, 1) 100%)",
                }}
              >
                {numOfRolls}
              </span>{" "}
              rolls
            </h2>
            <div className="best-time">
              <h3 className="font-mono">Best</h3>
              <div
                className="p-1 rounded text-white font-mono"
                style={{
                  background:
                    "linear-gradient(315deg, hsla(202, 80%, 24%, 1) 12%, hsla(27, 96%, 61%, 1) 87%, hsla(31, 97%, 72%, 1) 100%)",
                }}
              >
                <span>
                  {("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:
                </span>
                <span>
                  {("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:
                </span>
                <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

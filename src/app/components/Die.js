import React from "react";

const Die = (props) => {
  return (
    <div
      className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer"
      style={{
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
        backgroundColor: props.isHeld ? "#FDBA74" : "white",
      }}
      onClick={props.holdDice}
    >
      <h2 className="font-black	text-3xl">{props.value}</h2>
    </div>
  );
  m;
};

export default Die;

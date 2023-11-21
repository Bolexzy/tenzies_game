"use client";
import Image from "next/image";
import Die from "./components/Die";
import React from "react";
import styles from "./page.module.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { all } from "axios";
import Modal from "./components/Modal";

export default function Home() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // dice rolls
  const [numOfRolls, setNumOfRolls] = React.useState(0);

  // timer
  const [currentTime, setCurrentTime] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  // best time
  const [bestTime, setBestTime] = React.useState(23450);

  // useEffect Hook that gets bestTime from localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBestTime = localStorage.getItem("bestTime");
      if (storedBestTime) {
        console.log(storedBestTime);
        setBestTime(storedBestTime);
      }
    }
  }, []);

  // Calculate time using useEffect Hook & setInterval() method
  React.useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!playing) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing]);

  // game state
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setPlaying(false);

      // Store Time at the end of a win in a variable
      let time = currentTime;
      // if currentTime > bestTime, store it in localStorage
      if (time < bestTime) {
        setBestTime(time);
        localStorage.setItem("bestTime", JSON.stringify(time));
      }

      // set game state and display message
      setTenzies(true);
      setShowModal(true);
    }
  }, [dice, currentTime, bestTime]);

  // genrate new nide object
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // create all new dice
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // hold die state when clicked
  function holdDice(id) {
    setPlaying(true);
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // roll dice and generate new dice
  function rollDice() {
    if (!tenzies) {
      setNumOfRolls((prevState) => prevState + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      // reset number or rolls
      setNumOfRolls(0);

      setTenzies(false);
      setShowModal(false);
      setDice(allNewDice());

      // Reset timer
      setCurrentTime(0);
    }
  }

  // die boxes
  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="min-h-screen flex flex-col justify-around items-center text-center  p-24 bg-[#F5F5F5] h-[300px] max-w-[700px] rounded-md mx-auto">
      {/* congratulations modal  */}
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          bestTime={bestTime}
          numOfRolls={numOfRolls}
        />
      )}
      {/* confetti drop  */}
      {tenzies && <Confetti />}
      <div className="flex flex-col justify-between">
        <h1 className="text-4xl font-black	mb-8">Tenzies</h1>
        <p className="subpixel-antialiased text-orange-950 text-sm md:test-base">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 text-xs md:text-base">
        <h2 className="font-mono text-xs md:text-base">
          Number of Rolls:{" "}
          <span
            className="p-1 rounded text-white"
            style={{
              background:
                "linear-gradient(315deg, hsla(202, 80%, 24%, 1) 12%, hsla(27, 96%, 61%, 1) 87%, hsla(31, 97%, 72%, 1) 100%)",
            }}
          >
            {numOfRolls}
          </span>
        </h2>
        {/* currentTime  */}
        <div className="current-time">
          <h3 className="font-mono">Current</h3>
          <div
            className="p-1  rounded text-white font-mono"
            style={{
              background:
                "linear-gradient(315deg, hsla(202, 80%, 24%, 1) 12%, hsla(27, 96%, 61%, 1) 87%, hsla(31, 97%, 72%, 1) 100%)",
            }}
          >
            <span>
              {("0" + Math.floor((currentTime / 60000) % 60)).slice(-2)}:
            </span>
            <span>
              {("0" + Math.floor((currentTime / 1000) % 60)).slice(-2)}:
            </span>
            <span>{("0" + ((currentTime / 10) % 100)).slice(-2)}</span>
          </div>
        </div>

        {/* best time  */}
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
            <span>{("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3  md:grid-cols-5 gap-5">{diceElements}</div>
      <button
        className={`${styles.roll_dice} h-[50px] w-[100px] border-none rounded-md	bg-[#5035FF] text-white texts-sm focus:outline-none cursor-pointer`}
        onClick={rollDice}
      >
        {tenzies ? "New game" : "Roll"}
      </button>
    </main>
  );
}

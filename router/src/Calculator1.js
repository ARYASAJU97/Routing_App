import React, { useState } from "react";
import "./Calculator1.css";
import { VscPrimitiveSquare } from "react-icons/vsc";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { PiClockCounterClockwiseThin } from "react-icons/pi";
import { PiListLight } from "react-icons/pi";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { LiaBackspaceSolid } from "react-icons/lia";
import {Link} from 'react-router-dom'

function Calculator() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState("");
  const [operation, setOperation] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);

  const appendValueHandler = (value) => {
    if (value === "." && display.includes(".")) {
      return;
    }
    if (value === "." && display === "") {
      setDisplay("0" + value);
    } else {
      if (isNewNumber) {
        setDisplay(value);
        setIsNewNumber(false);
      } else if (display.length <19){
        setDisplay(display + value);
      }
    }
    const lastChar = history[history.length - 1];
    if(lastChar==="=")  {
     setHistory("");
     setOperation("");
    }
  };

  const compute = () => {
    if (history === "" || display === "") return;

    let result;
    let historyNumber = parseFloat(history);
    let displayNumber = parseFloat(display);
    if (isNaN(historyNumber) || isNaN(displayNumber)) return;

    switch (operation) {
      case "/":
        if (displayNumber === 0) {
          setDisplay("cannot divide by zero");
          setHistory("");
          setOperation("");
          return;
        }
        result = historyNumber / displayNumber;
        break;
      case "*":
        result = historyNumber * displayNumber;
        break;
      case "+":
        result = historyNumber + displayNumber;
        break;
      case "-":
        result = historyNumber - displayNumber;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setHistory(history + operation + display + "=");
    setOperation("");
    setIsNewNumber(true);
  };

  const chooseOperationHandler = (selectedOperation) => {
    if (display === "") return;

    if (history !== "") {
      compute();
    }

    setHistory(display);
    setOperation(selectedOperation);
    setDisplay("");
    setIsNewNumber(true);
  };

  const calculateResult = () => {
    if (operation) {
      compute();
    }
  };

  const clearDisplay = () => {
    setDisplay("");
    setHistory("");
    setOperation("");
  };

  const ClearEntry = () => {
    try {
      setDisplay("");
      setHistory("")
    } catch (error) {
      setDisplay("ERROR");
    }
  };
  const handleSignChange = () => {
    setDisplay(-1 * parseFloat(display).toString());
  };

  const calculateRoot = () => {
    try {
      const result = Math.sqrt(parseFloat(display));
      setDisplay(result);
      setHistory("√(" + display + ")");
      setOperation("");
      setIsNewNumber(true);
    } catch (error) {
      setDisplay("ERROR");
      setHistory("ERROR");
    }
  };
  const calculatePercentage = () => {
    try {
      const result = (parseFloat(display) / 100).toString();

      setDisplay(result);
      setHistory(result);
      setOperation("");
      setIsNewNumber(true);
    } catch (error) {
      setDisplay("ERROR");
    }
  };
  const calculateReciprocal = () => {
    try {
      const result = (1 / parseFloat(display)).toString();

      setDisplay(result);
      setHistory("1/(" + display + ")");
      setOperation("");
      setIsNewNumber(true);
    } catch (error) {
      setDisplay("ERROR");
    }
  };
  const calculateSquare = () => {
    try {
      const result = (parseFloat(display) ** 2).toString();
      setDisplay(result);
      setHistory("sqr(" + display + ")");
      setOperation("");
      setIsNewNumber(true);
    } catch (error) {
      setDisplay("ERROR");
    }
  };

  const clearBackspace = () => {
    const lastChar = history[history.length -1];
    try { 
      if(lastChar==="=")
      {
        setHistory("");
        setOperation("");
      }
      else {
      setDisplay(display.slice(0, -1));}
    } catch (error) {
      return;
    }
  };

  const buttons = [
    { text: "%", onClick: () => calculatePercentage()},
    { text: "CE", onClick:()=> ClearEntry() }, 
    { text: "C", onClick: () => clearDisplay() },
    { text: <LiaBackspaceSolid />, onClick: () => clearBackspace() },
    { text: "¹/𝓍", onClick: () => calculateReciprocal() }, 
    { text: "𝓍²", onClick: () => calculateSquare()}, 
    { text: "²√𝓍", onClick: () => calculateRoot() }, 
    { text: "/", onClick: () => chooseOperationHandler("/") },
    { text: "7", onClick: () => appendValueHandler("7") },
    { text: "8", onClick: () => appendValueHandler("8") },
    { text: "9", onClick: () => appendValueHandler("9") },
    { text: "*", onClick: () => chooseOperationHandler("*") },
    { text: "4", onClick: () => appendValueHandler("4") },
    { text: "5", onClick: () => appendValueHandler("5") },
    { text: "6", onClick: () => appendValueHandler("6") },
    { text: "-", onClick: () => chooseOperationHandler("-") },
    { text: "1", onClick: () => appendValueHandler("1") },
    { text: "2", onClick: () => appendValueHandler("2") },
    { text: "3", onClick: () => appendValueHandler("3") },
    { text: "+", onClick: () => chooseOperationHandler("+") },
    { text: "+/-", onClick: () => handleSignChange() }, 
    { text: "0", onClick: () => appendValueHandler("0") },
    { text: ".", onClick: () => appendValueHandler(".") },
    { text: "=", onClick: () => calculateResult() },
  ];

  return (
    <div className="back">
    <Link className="lin" to="/">back</Link>
    <div className="App">
      <div className="App_calculator">
        <div className="title">
          Calculator
          <div className="icon">
            <HiMiniMinusSmall style={{ marginLeft: "95px" }} />
            <VscPrimitiveSquare style={{ marginLeft: "50px" }} />
            <HiMiniXMark style={{ marginLeft: "30px" }} />
          </div>
        </div>

        <div className="stand">
          <span>
            <h5>
              <PiListLight style={{ marginRight: "10px" }} />
              Standard
              <BsBoxArrowInUpRight style={{ marginLeft: "25px" }} />
              <PiClockCounterClockwiseThin style={{ marginLeft: "144px" }} />
            </h5>
          </span>
        </div>
        <div className="history" id="history">
          {history}
          {operation}
        </div>
        <br></br>
        <div className="display" id="display">
          {display || "0"}
        </div>
        <div className="buttons">
          {buttons.map((button, index) => (
            <div className="row" key={index}>
              <button
                className={`col${button.text === "=" ? " symbol" : ""}`}
                onClick={button.onClick}
              >
                {button.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Calculator;

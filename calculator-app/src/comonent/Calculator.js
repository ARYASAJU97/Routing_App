import React, { useState } from "react";
import "./Calculator.css";
import {HiOutlineMinusSmall} from 'react-icons/hi2';
import {VscPrimitiveSquare} from 'react-icons/vsc'
import {IoCloseOutline} from 'react-icons/io5'
import {LiaBarsSolid} from 'react-icons/lia'
import {BsBoxArrowInUpRight} from 'react-icons/bs'
import {PiClockCounterClockwiseLight} from 'react-icons/pi'
import {BsBackspace} from 'react-icons/bs'


function Calculator() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState("");
  const [operation, setOperation] = useState("");

  const handleClick = (value) => {
   if (value === "." && display.includes("."))
    return;
 /* if(display.length <15){
    setDisplay(display+value);
  }*/
   
      const lastChar = display[display.length - 1];
      if (value === '.' && !isOperator(lastChar)) {
        if (display === '') {
          setDisplay('0' + value);
          setHistory('0' + value);
        } else {
          setDisplay(display + value);
          setHistory(display + value);
        }
      } else if (isOperator(value) && isOperator(lastChar)) {
        return;
      } else {
        setDisplay(display + value);
        setHistory(display + value);
      }
    };
     

  const isOperator = (char) => {
    return ["+", "-", "*", "/","."].includes(char);
  };

  const calculateResult = () => {
    try {
      const result = new Function('return ' + display)();
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("");
    }
  };

  const clearDisplay = () => {
    setDisplay("");
    setHistory("");
  };

  const ClearEntry = () => {
    setDisplay(display.slice(0, -1));
  };

  const handleSignChange = () => {
    setDisplay(-1 * parseFloat(display).toString());
  };

  const calculateRoot = () => {
    try {
      const result = Math.sqrt(parseFloat(display));
      setDisplay(result);
      setHistory("√(" + display + ")");
    } catch (error) {
      setDisplay("ERROR");
    }
  };
  const calculatePercentage = () => {
    try {
      const result = (parseFloat(display) / 100).toString();
      setDisplay(result);
    } catch (error) {
      setDisplay("ERROR");
    }
  };

  const calculateReciprocal = () => {
    try {
      const result = (1 / parseFloat(display)).toString();
      setDisplay(result);
      setHistory("1/(" + display + ")");
    } catch (error) {
      setDisplay("ERROR");
    }
  };
  const calculateSquare = () => {
    try {
      const result = (parseFloat(display) ** 2).toString();
      setDisplay(result);
      setHistory("sqr(" + display + ")");
    } catch (error) {
      setDisplay("ERROR");
    }
  };

  const clearEnd = () => {
    setHistory("");
    setDisplay(display.slice(0, -1));
  };

  const buttons = [
    "%",
    "CE",
    "C",
    "DEL",
    "¹/𝓍",
    "𝓍²",
    "²√𝓍",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ];

  return (
    <div className="calc">
      <div className="section">
        <div className="title">
          <div className="head">Calculator</div>
          <div className="icons">
          <HiOutlineMinusSmall style={{marginRight:"35px"}}/>             
          <VscPrimitiveSquare style={{marginRight:"36px"}}/>
          <IoCloseOutline/>
          </div>
        </div>
        <h3>
        <span>< LiaBarsSolid style={{height:"14px"}}/></span>{" "}
        Standard
           <span><BsBoxArrowInUpRight style={{marginLeft:"20px", height:"16px"}}/></span>
           <span><PiClockCounterClockwiseLight style={{marginLeft:"138px",height:"20px"}}/></span>
           </h3>
        <br></br>
        <div className="history" id="history">
          {history}
        </div>
        <br></br>
        <div className="display" id="display">
          {display || "0"}
        </div>
        <div className="buttons">
          {buttons.map((button, index) => (
            <div className="row" key={index}>
              <button
                className={`${["="].includes(button) ? "symbol" : "col"} `} 
                onClick={() => {
                  switch (button) {
                    case "C":
                      clearDisplay();
                      break;
                    case "CE":
                      ClearEntry();
                      break;
                    case "+/-":
                      handleSignChange();
                      break;
                    case "=":
                      calculateResult ();
                      break;
                    case "²√𝓍":
                      calculateRoot();
                      break;
                    case "%":
                      calculatePercentage();
                      break;
                    case "¹/𝓍":
                      calculateReciprocal();
                      break;
                    case "𝓍²":
                      calculateSquare();
                      break;
                    case "DEL":
                      clearEnd();
                      break;
                    default:
                      handleClick(button);
                      break;
                  }
                }}
              >
                {button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;

import React, { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const opStr = "+-/*";
  const lastChar = expression[expression.length - 1];
  const lastTwoChar = expression.slice(-2);

  const handleNumberClick = (input) => {
    if (display.length > 28) {
      setErrorMessage("DIGIT LIMIT MET");
      setTimeout(() => {
        setErrorMessage("");
      }, 500);
      return;
    }

    if (display === "0" || opStr.includes(display)) {
      setDisplay(input);
    } else {
      setDisplay(display + input);
    }
    setExpression((prev) => prev + input);
  };

  const handleDecimalClick = () => {
    if (!display.includes(".")) {
      setDisplay((prevDisplay) => prevDisplay + ".");
    }
    if (expression.length < 1) {
      setExpression("0.");
    } else if (lastChar !== ".") {
      setExpression((prev) => prev + ".");
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setExpression("");
  };

  const handleDeleteClick = () => {
    if (display.length > 1 || expression.length > 1) {
      setDisplay(display.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else {
      setDisplay("0");
      setExpression("");
    }
  };

  const handleOperatorClick = (op) => {
    if (expression.length < 1) {
      setExpression("0" + op);
      setDisplay(op);
      return;
    }

    if (op === "-" && lastChar === "-") {
      return;
    }

    if (opStr.includes(lastTwoChar[0]) && opStr.includes(lastTwoChar[1])) {
      setExpression((prev) => prev.slice(0, -2) + op);
      setDisplay(op);
      return;
    } else if (opStr.includes(lastChar)) {
      if (op === "-" && lastChar !== "-") {
        setExpression((prev) => prev + op);
        setDisplay(op);
      } else {
        setExpression((prev) => prev.slice(0, -1) + op);
        setDisplay(op);
      }
    } else {
      setExpression((prev) => prev + op);
      setDisplay(op);
    }
  };

  const handleEqualsClick = () => {
    let result = 0;
    try {
      if (expression.length < 1) {
        return;
      } else if (opStr.includes(lastChar)) {
        result = evaluate(expression.slice(0, -1));
      } else {
        result = evaluate(expression);
      }
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setErrorMessage("Error");
      setTimeout(() => {
        setErrorMessage("");
      }, 500);
      setExpression("");
      setDisplay("0");
    }
  };

  return (
    <>
      <div id="wrapper">
        <div id="calculator">
          <div id="screen">
            <p>{expression}</p>

            <div id="display">
              <p>{errorMessage || display}</p>
            </div>
          </div>
          <div id="input-container">
            <button id="delete" onClick={handleDeleteClick}>
              DEL
            </button>
            <button
              id="divide"
              value="/"
              onClick={(event) => handleOperatorClick(event.target.value)}
            >
              /
            </button>
            <button
              id="multiply"
              value="*"
              onClick={(event) => handleOperatorClick(event.target.value)}
            >
              *
            </button>
            <button
              id="seven"
              value="7"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              7
            </button>
            <button
              id="eight"
              value="8"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              8
            </button>
            <button
              id="nine"
              value="9"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              9
            </button>
            <button
              id="add"
              value="+"
              onClick={(event) => handleOperatorClick(event.target.value)}
            >
              +
            </button>
            <button
              id="four"
              value="4"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              4
            </button>
            <button
              id="five"
              value="5"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              5
            </button>
            <button
              id="six"
              value="6"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              6
            </button>
            <button
              id="subtract"
              value="-"
              onClick={(event) => handleOperatorClick(event.target.value)}
            >
              -
            </button>
            <button
              id="one"
              value="1"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              1
            </button>
            <button
              id="two"
              value="2"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              2
            </button>
            <button
              id="three"
              value="3"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              3
            </button>
            <button id="equals" value="=" onClick={handleEqualsClick}>
              =
            </button>
            <button id="clear" onClick={handleClearClick}>
              AC
            </button>
            <button
              id="zero"
              value="0"
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              0
            </button>
            <button id="decimal" value="." onClick={handleDecimalClick}>
              .
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

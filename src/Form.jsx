import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [inputValues, setInputValues] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setInputValues(e.target.value);
  };

  const handleOperationChange = (e) => {
    setSelectedOperation(e.target.value);
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    try {
      const numbers = inputValues
        .split(",")
        .map((num) => parseFloat(num.trim()));

      if (isNaN(numbers[0])) {
        throw new Error("Invalid input.");
      }

      let calculatedResult;

      switch (selectedOperation) {
        case "sum":
          calculatedResult = numbers.reduce((acc, num) => acc + num, 0);
          break;
        case "average":
          calculatedResult =
            numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
          break;
        case "mode":
          const frequencyMap = {};
          numbers.forEach((num) => {
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;
          });
          const mostFrequency = Math.max(...Object.values(frequencyMap));
          const modes = Object.keys(frequencyMap).filter(
            (num) => frequencyMap[num] === mostFrequency
          );
          calculatedResult = modes.map((mode) => parseFloat(mode));
          break;
        default:
          throw new Error("Invalid operation.");
      }

      setResult(calculatedResult);
    } catch (error) {
      setResult(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleCalculate}>
        <input
          id="values"
          name="values"
          type="text"
          value={inputValues}
          onChange={handleInputChange}
        />
    <div className="operation-bar">
        <select
        
          id="operation"
          name="operation"
          value={selectedOperation}
          onChange={handleOperationChange}
          
        >
          <option value="">...</option>
          <option value="sum">SUM</option>
          <option value="average">AVERAGE</option>
          <option value="mode">MODE</option>
        </select>
        </div>
        <div className="submit-button">
        <button type="submit">CALCULATE</button>
        </div>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}

export default Form;

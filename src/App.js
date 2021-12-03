import { useState } from 'react';
import './App.css';
function App() {

  const [value, setValue] = useState("");
  const [historyValue, setHistory] = useState("");
  const [equalPressed, setEqualPressed] = useState(false);
  const [operatorPressed, setOperatorPressed] = useState(false);
  const [commaPressed, setCommaPressed] = useState(false);
  const NumberButtons = Array.from(Array(10).keys()).map((digit) => 
    <Button key={digit} value={digit} onPress={numberPress}/>);

  function appendValue(buttonValue) 
  {
    setValue("" + value + buttonValue);
    setEqualPressed(false);
  }

  function numberPress(buttonValue) 
  {
    if (equalPressed)
    {
      setValue(buttonValue);
    }
    else
    {
      appendValue(buttonValue);
    }
    setOperatorPressed(false);
    setEqualPressed(false);
  }

  function operatorPress(buttonValue)
  {
    if (!operatorPressed && value !== "")
    {
      appendValue(buttonValue);
      setCommaPressed(false);
      setOperatorPressed(true);
    }
  }

  function commaPress(buttonValue)
  {
    if (!commaPressed && !equalPressed)
    {
      appendValue(buttonValue);
      setCommaPressed(true);
    }
  }

  function calculate() 
  {
    setValue(eval(value));
    setEqualPressed(true);
    setHistory(value);
  }

  function setToHistory()
  {
    setValue(historyValue);
  }

  function resetPress()
  {
    setValue("");
    setHistory("");
    setEqualPressed(false);
    setCommaPressed(false);
    setOperatorPressed(false);
  }
  
  return (
    <div className="App">
      <header className="App-header">
      <div id = "calculator">
        <Display history={historyValue} result={value} onHistoryClicked = {setToHistory}/>
        <table>
          <tr>
            {NumberButtons[7]} {NumberButtons[8]} {NumberButtons[9]} <Button value = "/" onPress={operatorPress}/>
          </tr>
          <tr>
            {NumberButtons[4]} {NumberButtons[5]} {NumberButtons[6]} <Button value = "*" onPress={operatorPress} />
          </tr>
          <tr>
            {NumberButtons[1]} {NumberButtons[2]} {NumberButtons[3]} <Button value = "-" onPress={operatorPress} />
          </tr>
          <tr>
            {NumberButtons[0]} <Button value = "." onPress={commaPress} /> <Button className = "equalButton" value = "=" onPress={calculate}/> <Button value = "+" onPress={appendValue} />
          </tr>
          <tr colspan = "4">
            <td>
              <ResetButton value = "Reset" onPress={resetPress}/>
            </td>
          </tr>
        </table>
        </div>
      </header>
    </div>
  );
}

function Display(props) 
{
  return (
    <div>
    <div onClick={() => props.onHistoryClicked()} id = "historyScreen">{props.history}</div>
    <div id = "resultScreen">{props.result}</div>
    </div>
  )
}

function Button(props) 
{
  return (
    <button className = {props.className} id = "calcButton" onClick={() => props.onPress(props.value)}>{props.value}</button>
  )
}

function ResetButton(props) 
{
  return (
    <button id = "resetButton" onClick={() => props.onPress(props.value)}>{props.value}</button>
  )
}

export default App;

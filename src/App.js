import './App.css';
import { useState } from "react";

var tempCash = [{
  note: 2000,
  count: 0
},
{
  note: 500,
  count: 0
},
{
  note: 100,
  count: 0
},
{
  note: 20,
  count: 0
},
{
  note: 10,
  count: 0
},
{
  note: 5,
  count: 0
},
{
  note: 1,
  count: 0
}];

function App() {
  const [cash, setCash] = useState([]);
  const [cashToPay, setCashToPay] = useState(0);
  const [cashPaid, setCashPaid] = useState(0);
  const [showCashPaidInput, setShowCashPaidInput] = useState(false);
  const [status, setStatus] = useState("");

  const nextInputHandler = () => {
    if (cashToPay === 0)
      setStatus("Cash To Pay Cannot Be Empty");
    else
      setShowCashPaidInput(true);
  }

  const usrInputHandler = (e) => {
    if (e.target.name === "toPay")
      setCashToPay(parseInt(e.target.value));
    else
      setCashPaid(parseInt(e.target.value));
  }

  const changeReturnHandler = () => {
    if (cashPaid === 0)
      setStatus("Cash Amount Cannot Be Empty");
    else if (cashPaid < cashToPay)
      setStatus("Cash Paid Cannot Be Less than Cash Amount");
    else {
      let toReturn = cashPaid - cashToPay;
      let i = 0;
      while (toReturn > 0) {
        if (toReturn >= tempCash[i].note)
          tempCash[i].count = Math.floor(toReturn / tempCash[i].note);
        toReturn -= tempCash[i].count * tempCash[i].note;
        ++i;
      }
      setStatus("Total Notes to return: ");
      setCash(tempCash);
    }
  }

  return (
    <div className="App">
      <input type="number" name="toPay" placeholder="enter cash to pay" onChange={usrInputHandler} />
      <button onClick={nextInputHandler}>Next</button>
      {showCashPaidInput && <div>
        <input type="number" name="paid" placeholder="enter cash given" onChange={usrInputHandler} />
        <button onClick={changeReturnHandler}>Check</button>
      </div>}
      <div> {status} </div>
      {
        cash.map((note, index) => {
          return <div key={index}>{note.note}: {note.count}</div>
        })
      }
    </div>
  );
}

export default App;

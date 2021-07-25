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
  const [showTable, setShowTable] = useState(false);

  const nextInputHandler = () => {
    if (cashToPay === 0)
      setStatus("Bill Amount Cannot Be Empty");
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
      setStatus("Cash Given Cannot Be Empty");
    else if (cashPaid < cashToPay)
      setStatus("Cash Given Cannot Be Less Than Bill Amount");
    else if (cashPaid === cashToPay)
      setStatus("No Cash To Return");
    else {
      let toReturn = cashPaid - cashToPay;
      let i = 0;
      while (toReturn > 0) {
        if (toReturn >= tempCash[i].note)
          tempCash[i].count = Math.floor(toReturn / tempCash[i].note);
        toReturn -= tempCash[i].count * tempCash[i].note;
        ++i;
      }
      setStatus("Total Notes To Return: ");
      setShowTable(true);
      setCash(tempCash);
    }
  }

  return (
    <div className="App">
      <h1 className="heading">Cash Register</h1>
      <p className="description">Enter the bill amount you need to pay and the cash given and the app will tell you how many notes you need back!
        </p>
      <label className="label-inputField" htmlFor="toPay">Bill Amount:</label>
      <input
        type="number"
        name="toPay"
        placeholder="enter cash to pay"
        min="0"
        onChange={usrInputHandler}
        className="inputField"
      />
      <button
        onClick={nextInputHandler}
        className="button">
        Next
        </button>
      {showCashPaidInput &&
        <div className="second-inputField">
          <label className="label-inputField" htmlFor="paid">Cash Given:</label>

          <input
            type="number"
            name="paid"
            placeholder="enter cash given"
            min="0"
            onChange={usrInputHandler}
            className="inputField"
          />
          <button
            onClick={changeReturnHandler}
            className="button">
            Check
          </button>
        </div>
      }
      <div className="status"> {status} </div>

      {showTable &&
        <table className="table">
          <thead>
            <tr className="table-row">
              <th className="table-heading"> Notes </th>
              <th className="table-heading"> Count </th>
            </tr>
          </thead>
          {
            cash.map((note, index) => {
              return <tbody key={index}>
                <tr className="table-row">
                  <td className="table-column"> {note.note} </td>
                  <td className="table-column"> {note.count === 0 ? "-" : note.count} </td>
                </tr>
              </tbody>
            })
          }
        </table>
      }
      <footer>
        <h3>Let's Connect</h3>
        <a href="https://github.com/shraddha-1402" rel="noreferrer noopener" target="_blank" className="link">
          <span className="fa fa-github" aria-hidden="true"></span>
        </a>
        <a href="https://twitter.com/ShraddhaGupta08" rel="noreferrer noopener" target="_blank" className="link">
          <span className="fa fa-twitter" aria-hidden="true"></span>
        </a>
        <a href="https://www.linkedin.com/in/shraddha-1402/" rel="noreferrer noopener" target="_blank" className="link">
          <span className="fa fa-linkedin" aria-hidden="true"></span>
        </a>
      </footer>
    </div>
  );
}

export default App;

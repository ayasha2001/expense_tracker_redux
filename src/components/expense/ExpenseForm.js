import React, { useEffect, useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onItemAdd, item, onItemEdit }) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (item) {
      setType(item.type);
      setAmount(item.amount);
      setDate(item.date);
      setDescription(item.description);
    }
  }, [item]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (item) {
      onItemEdit({
        id: item.id,
        type: type,
        amount: amount,
        date: date,
        description: description,
      });
      return;
    }
    const data = {
      type: type,
      amount: amount,
      date: date,
      description: description,
    };
    onItemAdd(data);
  };

  return (
    <div>
      <section className="content">
        <h3 className="secondTitle">Add a new item: </h3>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="formLine-left">
              <span>Type:</span>
              <select id="type" onChange={handleTypeChange}>
                <option value="not selected">Select type</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Grocery">Grocery</option>
                <option value="Movie">Movie</option>
                <option value="Outing">Outing</option>
              </select>
            </div>
            <div className="formLine-right">
              <span>Amount:</span>
              <input
                type="text"
                onChange={handleAmountChange}
                value={amount}
                required
              ></input>
            </div>
            <div className="formLine-left">
              <span>Date:</span>
              <input
                type="date"
                onChange={handleDateChange}
                value={date}
                required
              ></input>
            </div>

            <div className="formLine-right">
              <span>Description:</span>
              <input
                type="text"
                onChange={handleDescriptionChange}
                value={description}
                required
              />
            </div>

            <button type="submit" className="buttonSave">
              Add a new expense
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ExpenseForm;

import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income) => {
    const newIncome = { ...income, userId: localStorage.getItem("id") };
    const response = await axios
      .post(`${BASE_URL}income/add`, newIncome)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(
      `${BASE_URL}user/${localStorage.getItem("id")}`
    );
    setIncomes(response.data.income);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}income/${id}`);
    console.log(`${BASE_URL}income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income) => {
    const newIncome = { ...income, userId: localStorage.getItem("id") };
    const response = await axios
      .post(`${BASE_URL}expense/add`, newIncome, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}expense`);
    setExpenses(response.data);
    console.log(response.data.expense);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

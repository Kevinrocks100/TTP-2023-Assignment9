import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';

const App = (props) => {
  const [accountBalance, setAccountBalance] = useState(0)
  const [currentUser, setCurrentUser] = useState({
    userName: 'Bob Loblaw',
    memberSince: '08/23/99',
  })
  const [creditList, setCreditList] = useState([])
  const [debitList, setDebitList] = useState([])
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    async function fetchCredit() {
      try {
        const response = await axios.get("https://bank-of-react-b745wfs0u-ajlapid718.vercel.app/credits"); 
        const initialCreditAmount = response.data; 
        let initialCreditDescription = "Inital Credit"; 
        let initialCreditDate = "6/20/2023"; 
        setCredit(initialCreditAmount);
        let initialCredit = {
          description : initialCreditDescription, 
          amount : initialCreditAmount, 
          date : initialCreditDate
        }
        setCreditList([initialCredit]); 
      } catch (error) {
        console.error("Error" + error.message);
      }
    }
    fetchCredit();
  }, []);

  useEffect(() => {
    async function fetchDebit() {
      try {
        const response = await axios.get("https://bank-of-react-b745wfs0u-ajlapid718.vercel.app/debits");
        const initialDebitAmount = response.data; 
        let initialDebitDescription = "Inital Debit"; 
        let initialDebitDate = "6/20/2023"; 
        setDebit(initialDebitAmount);
        let initialDebit = {
          description : initialDebitDescription, 
          amount : initialDebitAmount, 
          date : initialDebitDate
        }
        setDebitList([initialDebit]); 
      } catch (error) {
        console.error("Error" + error.message);
      }
    }
    fetchDebit();
  }, []);

  function balance(debit, credit) {
    return debit - credit;
  }
  const bal = balance(debitList, creditList);
  const creditAmount = creditList;
  const debitAmount = debitList;


  //mock log in
  const mockLogIn = (logInInfo) => {
    const newUser = { ...currentUser }
    newUser.userName = logInInfo.userName
    setCurrentUser(newUser);
  }

  return (
    <Router>
      {/* navigation */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="/TTP-2023-Assignment9">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/TTP-2023-Assignment9/debits">Debits</Nav.Link>
          <Nav.Link href="/TTP-2023-Assignment9/credits">Credits</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/TTP-2023-Assignment9/userProfile">{currentUser.userName}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      {/* rounters */}
      <Routes>
        <Route
          exact path="/TTP-2023-Assignment9"
          element={<Home accountBalance={accountBalance} debit={debit} credit={credit} />}
        />
        <Route
          exact path="/TTP-2023-Assignment9/userProfile"
          element={<UserProfile userName={currentUser.userName} memberSince={currentUser.memberSince} />}
        />
        <Route
          exact path="/TTP-2023-Assignment9/login"
          element={<LogIn user={currentUser} mockLogIn={mockLogIn} {...props} />}
        />
        <Route
          path="/TTP-2023-Assignment9/debits"
          element={<Debits
            credit={credit}
            debit={debit}
            setDebit={setDebit}
            debitList={debitList}
            setDebitList={setDebitList}
            accountBalance={accountBalance}
            setAccountBalance={setAccountBalance}
          />}
        />
        <Route
          path="/TTP-2023-Assignment9/credits"
          element={<Credits
            credit={credit}
            setCredit={setCredit}
            creditList={creditList}
            setCreditList={setCreditList}
            debit={debit}
            accountBalance={accountBalance}
            setAccountBalance={setAccountBalance}
          />}
        />
      </Routes>
    </Router>

  );
}

export default App;
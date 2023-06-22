import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

function Debits(props) {
    console.log(props)

    const addDebit = (event) => {
        event.preventDefault(); 
        let newDebit = {}
        let description = event.target[0].value; 
        let amount = event.target[1].value; 
        const date = new Date().toLocaleDateString();
        newDebit.description = description; 
        newDebit.amount = amount; 
        newDebit.date = date; 
        props.setDebitList(() => {return[newDebit, ...props.debitList]});
        props.setDebit(parseInt(props.debit)+parseInt(amount));
    }

    return (
        <div>
            <h1>Debits</h1>
            <Link to="/">Home</Link>
            <br />
            <Link to="/userProfile">User Profile</Link>
            <form onSubmit={addDebit}>
                <label for="debitDescription">Debit Description</label><br />
                <input type="text" id="debitDescription" name="debitDescription" /><br />
                <label for="debitAmount">Debit Amount</label><br />
                <input type="number" id="debitAmount" name="debitAmount" /><br />
                <input type="submit" value="Add Debit" />
            </form>
            <div>
                <h2>Numbers:</h2>
                <ul>
                    {props.debitList.map((debit) => (
                        <li>{debit.description}{debit.amount}{debit.date}</li>
                    ))}
                </ul>
            </div>
            
            <AccountBalance accountBalance={props.accountBalance} debit={props.debit} credit={props.credit}/>
        </div>
    );
}

export default Debits;
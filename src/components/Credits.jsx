import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

function Credits(props) {
    console.log(props)

    const addCredit = (event) => {
        event.preventDefault(); 
        let newCredit = {}
        let description = event.target[0].value; 
        let amount = event.target[1].value; 
        const date = new Date().toLocaleDateString();
        newCredit.description = description; 
        newCredit.amount = amount; 
        newCredit.date = date; 
        props.setCreditList(() => {return[newCredit, ...props.creditList]}); 
        props.setCredit(parseInt(props.credit)+parseInt(amount)); 
    }

    return (
        <div>
            <h1>Credits</h1>
            <Link to="/TTP-2023-Assignment9">Home</Link>
            <br />
            <Link to="/TTP-2023-Assignment9/userProfile">User Profile</Link>
            <form onSubmit={addCredit}>
                <label for="creditDescription">Credit Description</label><br />
                <input type="text" id="creditDescription" name="creditDescription" /><br />
                <label for="creditAmount">Credit Amount</label><br />
                <input type="number" id="creditAmount" name="creditAmount" /><br />
                <input type="submit" value="Add Credit" />
            </form>
            <div>
                <h2>Transaction History</h2>
                <ul>
                    {props.creditList.map((credits) => (
                        <li>{credits.description} {credits.amount} {credits.date}</li>
                    ))}
                </ul>
            </div>
            
            <AccountBalance accountBalance={props.accountBalance} debit={props.debit} credit={props.credit}/>
        </div>
    );
}

export default Credits;
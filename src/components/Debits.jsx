import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

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
        props.setDebitList(() => { return [newDebit, ...props.debitList] });
        props.setDebit(parseInt(props.debit) + parseInt(amount));
    }

    return (
        <div className="text-center">
            <h1>Debits</h1>
            <AccountBalance accountBalance={props.accountBalance} debit={props.debit} credit={props.credit} />
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center" lg={6}>
                        {/* <Card.Img variant="top" src="../public/bankBackground.jpeg" /> */}
                        <Card.Body>
                            <Form onSubmit={addDebit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Debit Description</Form.Label>
                                        <Form.Control type="text" id="debitDescription" placeholder="Enter Debit Description" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Debit Amount</Form.Label>
                                        <Form.Control type="number" id="debitAmount" placeholder="Debit Amount" />
                                    </Form.Group>
                                </Row>
                                <Button variant="primary" type="submit">Add Debit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div>
                <h2>Transaction History</h2>
                <ul>
                    {props.debitList.map((debit) => (
                        <li>{debit.description} {debit.amount} {debit.date}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Debits;
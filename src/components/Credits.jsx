import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

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
        props.setCreditList(() => { return [newCredit, ...props.creditList] });
        props.setCredit(parseInt(props.credit) + parseInt(amount));
    }

    return (
        <div className="text-center">
            <h1>Credits</h1>
            <AccountBalance accountBalance={props.accountBalance} debit={props.debit} credit={props.credit} />
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center">
                        {/* <Card.Img variant="top" src="../public/bankBackground.jpeg" /> */}
                        <Card.Body>
                            <Form onSubmit={addCredit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Credit Description</Form.Label>
                                        <Form.Control type="text" id="creditDescription" placeholder="Enter Credit Description" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Credit Amount</Form.Label>
                                        <Form.Control type="number" id="creditAmount" placeholder="Credit Amount" />
                                    </Form.Group>
                                </Row>
                                <Button variant="primary" type="submit">Add Credit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div>
                <h2>Transaction History</h2>
                <ul>
                    {props.creditList.map((credits) => (
                        <li>{credits.description} {credits.amount} {credits.date}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Credits;
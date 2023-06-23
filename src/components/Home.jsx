import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import "../App.css"

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Card className="text-center">
          <Card.Body>
            <h1>Bank of React</h1>
            <Card.Text>
              <AccountBalance accountBalance={this.props.accountBalance} debit={this.props.debit} credit={this.props.credit}/>
              <Card.Title>Details</Card.Title>
              <p>Total Debit: ${this.props.debit}</p>
              <p>Total Credit: ${this.props.credit}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Home;
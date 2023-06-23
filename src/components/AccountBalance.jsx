import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div>
          Account Balance: ${this.props.accountBalance + this.props.debit - this.props.credit}
        </div>
    );
  }
}

export default AccountBalance;
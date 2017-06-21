import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import BankBalanceStore from './BankBalanceStore';
import BankActions from './BankActions';

class App extends Component {
  constructor() {
    super(...arguments);
    BankActions.createAccount();
  }

  deposit() {
    BankActions.depositIntoAccount(Number(this.refs.amount.value));
    this.refs.amount.value = '';
  }

  withdrew() {
    BankActions.withdrewFromAccount(Number(this.refs.amount.value));
    this.refs.amount.value = '';
  }

  render() {
    return (
      <div>
        <header>FluxTrust Bank</header>
        <h1>Your balance is $ {(this.state.balance).toFixed(2)}</h1>
        <div className='atm'>
          <input type='text' placeholder='Enter Amount' ref='amount' />
          <br />
          <button onClick={this.withdrew.bind(this)}>Withdrew</button>
          <button onClick={this.deposit.bind(this)}>Deposit</button>
        </div>
      </div>
    );
  }
}

App.getStores = ()=>([BankBalanceStore]);
App.calculateState = (prevState) => ({ balance: BankBalanceStore.getState() });

const AppContainer = Container.create(App);

render(<AppContainer />, document.getElementById('root'));

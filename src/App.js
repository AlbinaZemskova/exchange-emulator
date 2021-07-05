import React, {
  Component,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addOrderForSell,
  loadOrdersForSell,
} from './actions/sellOrders';
import {
  addOrderForBuy,
  loadOrdersForBuy,
} from './actions/buyOrders';
import {
  loadHistoryOfDeal,
} from './actions/history';
import { config } from './config';
import HistoryOfDeals from './HistoryOfDeals';
import InputDataForOrder from './InputDataForOrder';
import RenderOrders from './RenderOrders';
import store from './LocalStorage';
import './synchronization';

// for testing own logic
export class App extends Component {
  /**
   * Generate default data from config on the first launch
   * Load list of orders and history of deal
   */
  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('isInitialValuesWasSetted'))) {
      store.createStore('serverStorage', {
        buyOrders: [],
        sellOrders: [],
        history: [],
      });

      for (let i = 0; i < 15; i++) {
        this.props.addOrderForBuy(config.buyOrders[i]);
        this.props.addOrderForSell(config.sellOrders[i]);
      }

      localStorage.setItem('isInitialValuesWasSetted', JSON.stringify(true));
    } else {
      this.props.loadOrdersForBuy();
      this.props.loadOrdersForSell();
      this.props.loadHistoryOfDeal();
    }
  }

  render() {
    return (
      <Fragment>
        <InputDataForOrder />
        <RenderOrders />
        <HistoryOfDeals />
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addOrderForBuy,
    addOrderForSell,
    loadOrdersForBuy,
    loadOrdersForSell,
    loadHistoryOfDeal,
  }, dispatch);
};

App.propTypes = {
  addOrderForBuy: PropTypes.func.isRequired,
  addOrderForSell: PropTypes.func.isRequired,
  loadOrdersForBuy: PropTypes.func.isRequired,
  loadOrdersForSell: PropTypes.func.isRequired,
  loadHistoryOfDeal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);

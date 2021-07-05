import React, {
  Component,
  Fragment,
} from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addOrderForBuy } from './actions/buyOrders';
import { addOrderForSell } from './actions/sellOrders';
import Form from './Form';

// for testing own logic
export class InputDataForOrder extends Component {
  /**
   * Handles getting data for order of buy
   * @param { string } price - price for 1 bitcoin
   * @param { string } count - count of bitcoins
   */
  handleOrderOfBuy = (price, count, e) => {
    this.props.addOrderForBuy({
      price,
      count,
    });

    e.preventDefault();
    // reset data in input fields after submitting data
    e.target.reset();
  }

  /**
   * Handles getting data for order of sell
   * @param { string } price - price for 1 bitcoin
   * @param { string } count - count of bitcoins
   */
  handleOrderOfSell = (price, count, e) => {
    this.props.addOrderForSell({
      price,
      count,
    });

    e.preventDefault();
    // reset data in input fields after submitting data
    e.target.reset();
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col lg="6">
              <h3>Left your order for buy</h3>
              <Form handleSubmit={this.handleOrderOfBuy} />
            </Col>
            <Col lg="6">
              <h3>Left your order for sell</h3>
              <Form handleSubmit={this.handleOrderOfSell} />
            </Col>
          </Row>
        </Container>
        <hr />
      </Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  buyOrders: state.buyOrders.buyOrders,
});

export const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addOrderForBuy,
    addOrderForSell,
  }, dispatch);
};

InputDataForOrder.propTypes = {
  addOrderForBuy: PropTypes.func.isRequired,
  addOrderForSell: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputDataForOrder);

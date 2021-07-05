import React, { Fragment } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListOfOrders from './ListOfOrders';

// for testing own logic
export function RenderOrders({ buyOrders, sellOrders }) {
  sellOrders.reverse();

  return (
    <Fragment>
      <Container className="d-flex justify-content-center">
        <Row>
          <Col lg="12">
            <ListOfOrders listOfOrders={sellOrders} />
            <hr className="font-weigth-bold bg-dark mr-2 w-60" />
            <ListOfOrders listOfOrders={buyOrders} />
          </Col>
        </Row>
      </Container>
      <hr />
    </Fragment>
  );
}

export const mapStateToProps = state => ({
  buyOrders: state.buyOrders.buyOrders,
  sellOrders: state.sellOrders.sellOrders,
});

RenderOrders.propTypes = {
  buyOrders: PropTypes.arrayOf(
    PropTypes.exact({
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  sellOrders: PropTypes.arrayOf(
    PropTypes.exact({
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, null)(RenderOrders);

import React, { Fragment } from 'react';
import {
  Row,
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';


function ListOfOrders({ listOfOrders }) {
  return (
    <Fragment>
      {listOfOrders.map((index, i) => (
        <Row key={i} className="h5">
          <Col lg="5">
            $
            {index.price}
          </Col>
          <Col lg="2">
            x
          </Col>
          <Col lg="5">
            {index.count}
          </Col>
        </Row>
      ))}
    </Fragment>
  );
}

ListOfOrders.propTypes = {
  listOfOrders: PropTypes.arrayOf(
    PropTypes.exact({
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ListOfOrders;

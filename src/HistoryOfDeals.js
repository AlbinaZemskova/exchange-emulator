import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// for testing own logic
export function HistoryOfDeals({ history }) {
  return (
    <Container>
      <Row className="text-center h4">
        <Col lg="12">
          <h1 className="border border-success p-2">
            History Of Deal
          </h1>
          {history.map((index, i) => (
            <div key={i}>
              {index.count}
              &nbsp; bitcoins sold for price &nbsp; $
              {index.price}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export const mapStateToProps = state => ({
  history: state.history.history,
});

HistoryOfDeals.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.exact({
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, null)(HistoryOfDeals);

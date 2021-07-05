import React, { useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';


const Form = ({ handleSubmit }) => {
  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');

  return (
    <form
      className="mt-3"
      onSubmit={e => handleSubmit(price, count, e)}
    >
      <span>
        Count of bitcoin
      </span>
      <br />
      <input
        value={count}
        className="w-50"
        onChange={e => setCount(+e.target.value)}
        id="count"
        autoComplete="off"
      />
      <br />
      <span>
        Price of 1 bitcoin
      </span>
      <br />
      <input
        value={price}
        className="w-50"
        onChange={e => setPrice(+e.target.value)}
        id="price"
        autoComplete="off"
      />
      <br />
      <Button
        className="mt-2"
        color="success"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;

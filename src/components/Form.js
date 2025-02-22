import React from 'react';


const Form = (props) => {
  return (
    <form onSubmit={props.getWeather}>
      <input type="text" placeholder="city" name="city" />
      <input type="text" placeholder="country" name="country" />
      <button>Get Weather</button>
    </form>
  )
};

export default Form;

import React from 'react';

const Header = (props) => {
  const { name } = props;

  return <div className='header'>Welcome, {name}!</div>;
};

export default Header;

import React from 'react';

const Button = ({ button }) => {

  return (
    <button type="button" className={button.className} dangerouslySetInnerHTML={{__html: button.value}} />
  );
}

export default Button;

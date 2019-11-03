import React from 'react';
import ReactDOM from 'react-dom';
import App from './Timeline';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Timeline />, div);
  ReactDOM.unmountComponentAtNode(div);
});

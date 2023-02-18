import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div>
      <div>404</div>
      <Link to=".">to home</Link>
  </div>
);

export default NotFound;

import React from 'react';

//Components
import { Router, RouteComponentProps } from '@reach/router';
import Buyers from './buyers';
import Sellers from './sellers';
import SignUp from '../components/signup';
import Login from '../components/login';
import VerifyPhone from '../components/verify-phone';
// import { AuthConsumer } from '../../auth/AuthContext';

// Props Types
// export interface UsersProps {}

const Users: React.FC<RouteComponentProps> = () => {
  return (
    <Router primary={false}>
      <Buyers path="buyers/*" />
      <Sellers path="sellers/*" />
      <Login path="/login" />
      <SignUp path="/signup" />
      <VerifyPhone
        path="/verify-phone"
        // handleAuth={handleAuthentication}
      />
    </Router>
  );
};

export default Users;

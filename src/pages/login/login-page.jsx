import React, {Component} from 'react';

import './login-page.scss';

import Signin from './signin/signin';
import Signup from './signup/signup';

class LoginPage extends Component {
  state = {
    currentForm: 'signin'
  };

  onSigninClick = () => {
    this.setState({currentForm: 'signin'})
  };

  onSignupClick = () => {
    this.setState({currentForm: 'signup'})
  };

  onRecoveryClick = () => {
    this.setState({currentForm: 'recovery'})
  };

  render() {
    return (
      <div className="login">
        <div className="login__wrap">
          {this.state.currentForm === 'signin' ? (
            <Signin
              onSignupClick={this.onSignupClick}
              onRecoveryClick={this.onRecoveryClick}
            />
          ) : ''}
          {this.state.currentForm === 'signup' ? (
            <Signup
              onSigninClick={this.onSigninClick}
            />
          ) : ''}

          {/*<div className="forget">*/}
          {/*  <label className="signin__label">*/}
          {/*    <span>Email:</span>*/}
          {/*    <input type="text"/>*/}
          {/*  </label>*/}
          {/*  <button>Восстановить</button>*/}
          {/*</div>*/}

        </div>
      </div>
    );
  }
}

export default LoginPage;

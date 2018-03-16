import React from 'react';
import { connect } from 'react-redux';
import { login as loginFromReducer} from '../redux/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    return (
      <div className="signin-container">
        <div className="local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control landing-page"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control landing-page"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{this.props.message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{this.props.message} with Google</span>
            </a>
          </p>
      </div>
    </div>
    );
  }
  onLoginSubmit(event) {
    event.preventDefault();
    this.props.login({
      email: event.target.email.value,
      password: event.target.password.value
    })
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });
const mapDispatch = (dispatch, ownProps) => ({
login: (credentials) => (dispatch(loginFromReducer(credentials, ownProps.history)))
});

export default connect(mapState, mapDispatch)(Login);

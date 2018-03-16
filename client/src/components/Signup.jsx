import React from 'react';
import { connect } from 'react-redux';
import { signup as signupFromReducer} from '../redux/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
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
    )}
    onSignupSubmit(event) {
      event.preventDefault();
      this.props.signup({
        email: event.target.email.value,
        password: event.target.password.value
      })
    }

}



const mapState = () => ({ message: 'Signup' });
const mapDispatch = (dispatch, ownProps) => ({
signup: credentials => dispatch(signupFromReducer(credentials, ownProps.history)),
});

export default connect(mapState, mapDispatch)(Signup);

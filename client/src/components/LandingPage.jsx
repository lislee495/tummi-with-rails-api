import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

export default class LandingPage extends React.Component {
  render() {

    return(
      <div className="landing-page">
        <div className="image-wrapper">
          <div className="banner text-center">
            <h1 className="logo">Tummi</h1>
            <h5>A stomach's best friend.</h5>
            <br/>
            <br/>
            <span>
              <button className="trns-btn"><NavLink to="/signup" activeClassName="active landing-page">Signup</NavLink></button>
              <button className="trns-btn"><NavLink to="/login" activeClassName="active landing-page">Login</NavLink></button>
            </span>
          </div>
        </div>
        <div className="about">
          <div className="about-paragraph">
              <p>A stylish food app that puts practical user experience first.
              </p>
          </div>
          <div className="about-image">
          </div>
        </div>
        <div className="add-info">
          <div className="info">
          <p>Easily scan and filter menus based on likes and dislikes.</p>
          </div>
          <div className="info">
          <p>Save favorites to remember for later.</p></div>
          <div className="info">
          <p>Natural language processing maps out your personal tastes.</p></div>
        </div>
        <div className="footer">
          <div className="footer-info">
          Created by Lisa Lee
          <br/>
          with 
          <br/>
          <img src="/images/flatiron-logo.png" className="flatiron-logo"/>
          </div>
        </div>
      </div>
    )
  }
}

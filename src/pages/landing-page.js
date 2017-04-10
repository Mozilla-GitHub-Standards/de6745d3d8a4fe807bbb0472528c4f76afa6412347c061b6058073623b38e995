import React  from 'react';
import SignupForm from '../components/signup-form.js';
import NewsMatrices from '../components/news-matrices.js';

var Signup = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      showForm: false
    };
  },
  onButtonClick: function() {
    this.setState({
      showForm: true
    });
  },
  onClose: function() {
    this.setState({
      showForm: false
    });
  },
  render: function() {
    var className = "signup";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    var singupFormContainerClassName = "signup-form-container";
    console.log (this.state.showForm);
    if (this.state.showForm) {
      singupFormContainerClassName += " show";
    }
    return (
      <div className={className}>
        <div className="page">
          <div className="header">
            <img className="mozilla-logo" src="/assets/images/moz-logo-white.png" alt="mozilla logo in white" width="115px"/>
          </div>
          <div className="news-matrices-container">
            <NewsMatrices/>
          </div>
          <div className={singupFormContainerClassName}>
            <div className="signup-form-content">
              <SignupForm onClose={this.onClose}/>
            </div>
          </div>
          <div className="signup-cta-bar">
            <p>
              {this.context.intl.formatMessage({id: 'signup_cta_bar'})}
            </p>
              <button onClick={this.onButtonClick} className="signup-cta-button">Subscribe</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Signup;

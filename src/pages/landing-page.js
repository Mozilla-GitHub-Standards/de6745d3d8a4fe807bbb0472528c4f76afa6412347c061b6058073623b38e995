import React  from 'react';
import SignupForm from '../components/signup-form.js';
import NewsMatrices from '../components/news-matrices.js';

var Signup = React.createClass({
  render: function() {
    var className = "signup";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        <div className="page">
          <div className="news-matrices-container">
            <NewsMatrices/>
          </div>
          <div className="signup-form-container">
            <SignupForm/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Signup;

import React  from 'react';
import SignupForm from '../components/signup-form.js';

var Signup = React.createClass({
  render: function() {
    var className = "signup";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        <div className="page">
          <SignupForm/>
        </div>
      </div>
    );
  }
});

module.exports = Signup;

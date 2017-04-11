import React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { setEmailError, setEmail, setCountry, setPrivacyCheckbox, setPrivacyCheckboxError } from '../actions';
import { connect } from 'react-redux';
import classnames from "classnames";
import reactGA from 'react-ga';

var NOT_SUBMITTING = 0;
var SIGNUP_SUBMITTING = 1;

var Signup = React.createClass({
  mixins: [require('../mixins/basket.js')],
  contextTypes: {
    intl: React.PropTypes.object,
    localizedCountries: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      signupError: "",
      submitting: NOT_SUBMITTING
    };
  },
  emailChange: function(e) {
    this.props.setEmail(e.target.value);
  },
  countryChange: function(e) {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Country Focus"
    });
    this.props.setCountry(e.target.value);
  },
  privacyCheckboxChange: function(e) {
    this.props.setPrivacyCheckbox(e.target.checked);
  },
  onSubmit: function() {
    var valid = true;

    if (this.state.submitting !== NOT_SUBMITTING) {
      return;
    }

    if (!this.props.email.trim()) {
      valid = false;
      this.props.setEmailError(this.context.intl.formatMessage({id: "please_complete"}));
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Empty Email Error"
      });
    } else if (!this.emailInput.validity.valid) {
      valid = false;
      this.props.setEmailError(this.context.intl.formatMessage({id: "email_invalid"}));
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Invalid Email Error"
      });
    }

    if (!this.props.privacyCheckbox) {
      valid = false;
      this.props.setPrivacyCheckboxError(this.context.intl.formatMessage({id: "please_complete"}));
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Privacy Policy Error"
      });
    }

    if (valid) {
      reactGA.event({
        category: "Signup",
        action: "Submitting the form",
        label: "Copyright"
      });
      this.basket({
        email: this.props.email,
        country: this.props.country
      });
    }
  },
  onEmailInputClick: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Email Focus"
    });
  },
  onPrivacyCheckboxClick: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Privacy Checkbox Focus"
    });
  },
  render: function() {
    var emailClassName = classnames({
      "invalid": !!this.props.emailError
    });

    var buttonClassName = classnames(`button`, {
      "submitting": this.state.submitting === SIGNUP_SUBMITTING
    });
    var buttonText = this.context.intl.formatMessage({id: 'sign_up_button'});
    if (this.state.submitting) {
      buttonText = ``;
    }

    var localizedCountries = this.context.localizedCountries;

    return (
      <div className="signup-form">
        <img src="/assets/images/close.png" alt="close signup form button" className="close-button" onClick={this.props.onClose}/>
        <h1 className="call-to-action">{this.context.intl.formatMessage({id: 'call_to_action'})}</h1>
        <p className="signup-text">{this.context.intl.formatMessage({id: 'signup_text'})}</p>
        <input onClick={this.onEmailInputClick} autoComplete="off" ref={(input) => { this.emailInput = input; }} type='email' className={emailClassName} value={this.props.email} onChange={this.emailChange} required placeholder={this.context.intl.formatMessage({id: 'email'})}/>
        <p className="error-message">{this.props.emailError}</p>
        <select autoComplete="off" required value={this.props.country} onChange={this.countryChange}>
          <option value="">{this.context.intl.formatMessage({id: 'country'})}</option>
          {
            Object.keys(localizedCountries).sort().map(function(name, index) {
              return <option key={localizedCountries[name]} value={localizedCountries[name]}>{name}</option>;
            })
          }
          <option value="other" data-other="">{this.context.intl.formatMessage({id: 'country_other'})}</option>
        </select>
        <p className="error-message">{this.state.signupError}</p>
        <label>
          <input onClick={this.onPrivacyCheckboxClick} className="checkbox" autoComplete="off" onChange={this.privacyCheckboxChange} value={this.props.privacyCheckbox} type="checkbox"></input>
          <FormattedMessage
            id='sign_up_notice'
            values={{
              linkPrivacyNotice: (<a href="https://www.mozilla.org/privacy/websites/">{this.context.intl.formatMessage({id: 'link_pn'})}</a>)
            }}
          />
        </label>
        <p className="privacy-error error-message">{this.props.privacyCheckboxError}</p>
        <button onClick={this.onSubmit} className={buttonClassName}>
          {buttonText}
        </button>
        <label className="disclaimer-text">{this.context.intl.formatMessage({id: 'disclaimer_text'})}</label>
      </div>
    );
  }
});

module.exports = connect(
function(state) {
  return {
    email: state.signupForm.email,
    emailError: state.signupForm.emailError,
    country: state.signupForm.country,
    privacyCheckbox: state.signupForm.privacyCheckbox,
    privacyCheckboxError: state.signupForm.privacyCheckboxError
  };
},
function(dispatch) {
  return {
    setEmailError: function(data) {
      dispatch(setEmailError(data));
    },
    setEmail: function(data) {
      dispatch(setEmail(data));
    },
    setCountry: function(data) {
      dispatch(setCountry(data));
    },
    setPrivacyCheckbox: function(data) {
      dispatch(setPrivacyCheckbox(data));
    },
    setPrivacyCheckboxError: function(data) {
      dispatch(setPrivacyCheckboxError(data));
    }
  };
})(Signup);

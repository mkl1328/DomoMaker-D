const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

//need form like signup (no username tho)

//change entry in database

const handleChangePass = (e) => {
  e.preventDefault();
  helper.hideError();

  const oldPass = e.target.querySelector('#oldPass').value
  const pass = e.target.querySelector('#newPass').value
  const pass2 = e.target.querySelector('#newPass2').value

  if(!oldPass || !pass || !pass2) {
    helper.handleError('All fields are required');
    return false;
  }

  if(pass !== pass2) {
    helper.handleError('Passwords do not match!');
    return false;
  }

  //Need to send the username / sessionID??? to authenticate
  helper.sendPost(e.target.action, {oldPass, pass, pass2})

  return false;
}

const PassChangeWindow = (props) => {
  return(
    <form id="passChangeForm"
    name="passChangeForm"
    onSubmit={handleChangePass}   // write above
    action="/changePass"    // Add to router 
    method="POST"
    className="changePassForm"  //style in CSS (look at main from and signupform)
    >
      <label htmlFor="oldPass">Old Password:</label>
      <input type="text" name="oldPass" id="oldPass" placeholder='old password' />
      <label htmlFor="newPass">New Password:</label>
      <input type="text" name="newPass" id="newPass" placeholder='new password' />
      <label htmlFor="newPass2">Repeat New Password:</label>
      <input type="text" name="newPass2" id="newPass2" placeholder='repeat password' />
      <input type="submit" name="formSubmit" value="Change Password" />
    </form>
  )
}

const init = () => {
  ReactDOM.render(<PassChangeWindow />,
    document.getElementById('content'));
}

window.onload = init;
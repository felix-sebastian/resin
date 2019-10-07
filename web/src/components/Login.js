import React, { useState } from "react";
import CentredLayout from "./CentredLayout";
import { LOG_IN } from "../config/constants";
import axios from "axios";
import { Form, TextInput, Button } from "carbon-components-react";
import connect from "../lib/connect";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

export default compose(
  connect(),
  withRouter
)(props => {
  const [state, setState] = useState({
    username: "",
    password: "",
    logInFailed: false
  });

  const setUsername = e => setState({ ...state, username: e.target.value });
  const setPassword = e => setState({ ...state, password: e.target.value });

  const submit = e => {
    e.preventDefault();
    console.log(state);
    axios.post(LOG_IN, state).then(function(response) {
      if (response.data.success) {
        props.actions.loggedIn(response.data.token);
      } else {
        setState({ ...state, logInFailed: true });
      }
    });
  };

  return (
    <CentredLayout>
      <h3>Welcome to Resin</h3>
      <br />
      <Form>
        <TextInput
          labelText="Username"
          value={state.username}
          onChange={setUsername}
        />
        <br />
        <TextInput
          labelText="Password"
          value={state.password}
          onChange={setPassword}
        />
        <br />
        {state.logInFailed && (
          <>
            <p>Log in failed.</p>
            <br />
          </>
        )}
        <Button onClick={submit}>Log In</Button>
        <br />
        <br />
        <p>
          <small>
            <a href="#">Need help?</a>
          </small>
        </p>
      </Form>
    </CentredLayout>
  );
});
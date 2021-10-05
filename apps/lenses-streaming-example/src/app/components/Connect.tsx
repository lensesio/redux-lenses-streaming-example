import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import Button from "./Button";
import { actions } from "../actions";
import { State } from "../config/state";

export type ConnectStateProps = {
  updateHost: (payload: string) => Record<string, unknown>;
  updateUser: (payload: string) => Record<string, unknown>;
  updatePassword: (payload: string) => Record<string, unknown>;
  onLogin: (payload: string) => Record<string, unknown>;
  host: string;
  user: string;
  password: string;
};

export type ConnectProps = {
  connection?: boolean;
  heartbeatCount?: number;
};

const _Connect: React.FC<ConnectProps & ConnectStateProps> = ({
  host,
  user,
  password,
  connection = false,
  heartbeatCount = 0,
  updateHost,
  updateUser,
  updatePassword,
  onLogin,
}) => {
  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "host":
        updateHost(value);
        break;
      case "user":
        updateUser(value);
        break;
      case "password":
        updatePassword(value);
        break;
      default:
        break;
    }
  };
  const btnStyle = classnames("button is-fullwidth", {
    "is-primary": !connection,
    "is-danger": connection,
  });

  return (
    <nav className="panel">
      <p className="panel-heading">Connection Details</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input is-small"
            type="text"
            placeholder="host"
            value={host}
            name="host"
            onChange={onInputChange}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-server" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <p className="control has-icons-left">
          Heartbeat Count: {heartbeatCount}
        </p>
      </div>
      <div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="User"
              value={user}
              name="user"
              onChange={onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="password"
              placeholder="Password for Authentication"
              value={password}
              name="password"
              onChange={onInputChange}
              autoComplete="off"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </p>
        </div>
      </div>
      <div className="panel-block">
        <Button onClick={onLogin} className={btnStyle} data-testid="login-button">
          Login
        </Button>
      </div>
    </nav>
  );
};

const mapDispatchToProps = {
  ...actions,
};

const mapStateToProps = (state: State) => ({
  host: state.session.host,
  user: state.session.user,
  password: state.session.password,
});

const Connect =  connect(mapStateToProps, mapDispatchToProps)(_Connect);

export default Connect;

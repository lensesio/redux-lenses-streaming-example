import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Button from "./Button";
import { Action } from "../actions";

class Connect extends React.Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const options = {
      user: this.props.user,
      password: this.props.password,
    };
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case "host":
        this.props.updateHost(value);
        break;
      case "user":
        this.props.updateUser(value);
        break;
      case "password":
        this.props.updatePassword(value);
        break;
      default:
        break;
    }
  }

  render() {
    const { connection, heartbeatCount, host, user, password } = this.props;

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
              onChange={this.onInputChange}
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
                onChange={this.onInputChange}
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
                onChange={this.onInputChange}
                autoComplete="off"
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock" />
              </span>
            </p>
          </div>
        </div>
        <div className="panel-block">
          <Button onClick={this.onLogin} className={btnStyle}>
            Login
          </Button>
        </div>
      </nav>
    );
  }
}

Connect.defaultProps = {
  heartbeatCount: 0,
};

Connect.propTypes = {
  heartbeatCount: PropTypes.number,
};

const mapStateToProps = (state) => ({
  host: state.session.host,
  user: state.session.user,
  password: state.session.password,
});

const mapDispatchToProps = {
  ...Action,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);

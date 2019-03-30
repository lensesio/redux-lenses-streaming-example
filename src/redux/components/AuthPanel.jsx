import React from 'react';
import PropTypes from 'prop-types';

const AuthPanel = ({ user, password, onInputChange }) => (
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
);

AuthPanel.propTypes = {
  user: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default AuthPanel;

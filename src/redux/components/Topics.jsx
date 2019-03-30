import React from 'react';
import PropTypes from 'prop-types';

const Topics = ({ subscriptions, onUnsubscribe }) => (
  <div className="control">
    {
      subscriptions.map(subscription => (
          <button
          onClick={() => onUnsubscribe(subscription)}
          key={subscription}
          className="button is-danger is-outlined is-small is-pulled-right"
        >
        <span>{subscription}</span>
        <span className="icon is-small">
          <i className="fa fa-times" />
        </span>
        </button>)
      )
    }
  </div>
);

Topics.propTypes = {
  subscriptions: PropTypes.array.isRequired,
  onUnsubscribe: PropTypes.func.isRequired
};

export default Topics;

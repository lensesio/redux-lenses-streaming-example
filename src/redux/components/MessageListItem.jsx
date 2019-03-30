import React from 'react';
import PropTypes from 'prop-types';

const MessageListItem = ({ label, value }) => (
  <div className="column is-2">
    <div>{label}</div>
    {value}
  </div>
);

MessageListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};

export default MessageListItem;

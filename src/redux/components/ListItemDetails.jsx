import React from "react";
import PropTypes from "prop-types";

const ListItemDetailsRow = ({ label, value }) => (
  <li>
    <strong>{label}</strong>: {value}
  </li>
);

class ListItemDetails extends React.Component {
  commitMessage = (message) => {
    if (message) {
      this.props.onCommitMessage(message);
    }
  }

  clearSelectedItem = () => {
    this.props.onShowRowDetails({});
  }

  render() {
    const { message } = this.props;
    const { value } = message;
    let arr = [];
    if (value) {
      Object.keys(JSON.parse(value)).forEach(function(k) {
        arr.push({ label: k, value: JSON.parse(value)[k] });
      });
    }

    return (
      <div>
        {arr.length && (
          <div className="notification content list-item-details">
            <ul>
              {arr.map(item => (
                <ListItemDetailsRow
                  key={item.label}
                  label={item.label}
                  value={item.value ? String(item.value) : item.value}
                />
              ))}
            </ul>
            <button
              className="button is-info is-small"
              onClick={this.commitMessage(message)}
            >
              Commit
            </button>
            <button
              className="button is-white is-small"
              onClick={this.clearSelectedItem}
            >
              Hide details
            </button>
          </div>
        )}
      </div>
    );
  }
}

ListItemDetails.defaultProps = {
  message: {}
};

ListItemDetails.propTypes = {
  message: PropTypes.object,
  onShowRowDetails: PropTypes.func.isRequired
};

export default ListItemDetails;

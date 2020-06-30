import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const ListItemDetailsRow = ({ label, value }) => (
  <li>
    <strong>{label}</strong>: {value}
  </li>
);

class ListItemDetails extends React.Component {
  constructor(props) {
    super(props);

    this.commitMessage = this.commitMessage.bind(this);
    this.clearSelectedItem = this.clearSelectedItem.bind(this);
  }

  commitMessage(message) {
    return () => {
      if (message) {
        this.props.onCommitMessage(message);
      }
    };
  }

  clearSelectedItem() {
    this.props.onShowRowDetails({});
  }

  render() {
    let arr = [];
    const { message, onShowRowDetails } = this.props;
    const { value } = message;
    if (value) {
      Object.keys(JSON.parse(value)).forEach(function (k) {
        arr.push({ label: k, value: JSON.parse(value)[k] });
      });
    }
    return (
      <div>
        {arr.length > 0 ? (
          <div className="notification content list-item-details">
            <ul>
              {arr.map((item) => (
                <ListItemDetailsRow
                  key={item.label}
                  label={item.label}
                  value={item.value ? String(item.value) : item.value}
                />
              ))}
            </ul>
            <Button
              className="button is-info is-small"
              onClick={this.commitMessage(message)}
            >
              Commit
            </Button>
            <Button
              className="button is-white is-small"
              onClick={this.clearSelectedItem}
            >
              Hide details
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

ListItemDetails.defaultProps = {
  message: {},
};

ListItemDetails.propTypes = {
  message: PropTypes.object,
  onShowRowDetails: PropTypes.func.isRequired,
};

export default ListItemDetails;

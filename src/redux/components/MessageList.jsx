import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, AutoSizer } from "react-virtualized";
import { Action } from "../actions";
import ListItemDetails from "./ListItemDetails";
import MessageListItem from "./MessageListItem";

class MessageList extends React.Component {
  state = {
    message: {}
  }

  componentDidUpdate() {
    if (Object.keys(this.state.message).length === 0) {
      this.list.scrollToRow(this.props.messages.length);
    }
  }

  onShowRowDetails = d => {
    this.setState({ message: d });
  };

  rowRenderer = messages => ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style // Style object to be applied to row (to position it)
  }) => {
    const keys = Object.keys(JSON.parse(messages[index].key))
      .map((k) => ({ label: k, value: JSON.parse(messages[index].key)[k] }));
    const arr = Object.keys(JSON.parse(messages[index].value))
      .map((k) => ({ label: k, value: JSON.parse(messages[index].value)[k] }));

    return (
      <div
        key={key}
        style={style}
        className="message-row columns ws-message-list is-multiline"
        onClick={this.onShowRowDetails.bind(this, messages[index])}
      >
        <div className="column is-2">
          <div>Index</div>
          {index}
        </div>
        {keys.map(item => (
          <MessageListItem
            className="key"
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
        {arr.map(item => (
          <MessageListItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    );
  };

  render() {
    const { messages, onCommitMessage } = this.props;
    const { message } = this.state;

    return (
      <div>
        <ListItemDetails
          message={message}
          onCommitMessage={onCommitMessage}
          onShowRowDetails={this.onShowRowDetails}
        />
        <nav className="panel">
          <div className="panel-block">
            <AutoSizer className="autosizer-bulma-fix">
              {({ width }) => (
                <List
                  ref={list => (this.list = list)}
                  width={width}
                  height={290}
                  rowCount={messages.length}
                  rowHeight={160}
                  rowRenderer={this.rowRenderer(messages)}
                />
              )}
            </AutoSizer>
          </div>
        </nav>
      </div>
    );
  }
}

MessageList.defaultProps = {};

MessageList.propTypes = {
  onCommitMessage: PropTypes.func,
  message: PropTypes.object
};

const mapStateToProps = state => ({
  message: state.session.message,
  messages: state.session.messages
});

const mapDispatchToProps = {
  ...Action
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);

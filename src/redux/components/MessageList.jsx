import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { List } from 'react-virtualized';


class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    this.list.scrollToRow(this.props.messages.length);
  }

  render() {
    const { messages, onCommitMessage } = this.props;

    function rowRenderer({
      key,         // Unique key within array of rows
      index,       // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible,   // This row is visible within the List (eg it is not an overscanned row)
      style        // Style object to be applied to row (to position it)
    }) {
      return (
        <div
          key={key}
          style={style}
          className="message-row columns ws-message-list"
        >
          <div className="column is-1">{index}</div>
          <div className="column is-1">{JSON.stringify(messages[index].key)}</div>
          <div className="column is-9">{JSON.stringify(messages[index].value)}</div>
          <div className="column is-1">
            <button
              onClick={onCommitMessage.bind(null, messages[index])}
              className="button is-small is-white">
              Commit
            </button>
          </div>
        </div>
      )
    }

    return (
      <nav className="panel">
        <div className="panel-block">
          <List
            ref={(list) => {
              this.list = list
            }}
            width={800}
            height={290}
            rowCount={messages.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
            scrollToRow={messages.length - 1}
          />,
      </div>
      </nav>);
  }
}

MessageList.defaultProps = {
};

MessageList.propTypes = {
  onCommitMessage: PropTypes.func
};


export default MessageList;

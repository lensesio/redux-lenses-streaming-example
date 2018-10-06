import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { List, AutoSizer } from 'react-virtualized';
import { Action } from '../actions';

class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.onShowRowDetails = this.onShowRowDetails.bind(this);

    this.state = {
      message: {}
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.state.message).length === 0) {
      this.list.scrollToRow(this.props.messages.length);
    }
  }

  onShowRowDetails = (d) => {
    this.setState({ message: d });
  }

  render() {
    const { messages, onCommitMessage } = this.props;
    const { onShowRowDetails } = this;
    const { message } = this.state;

    function rowRenderer({
      key,         // Unique key within array of rows
      index,       // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible,   // This row is visible within the List (eg it is not an overscanned row)
      style,       // Style object to be applied to row (to position it)
    }) {

      let arr =[], keys = [];
      Object.keys(JSON.parse(messages[index].key)).forEach(function(k) {
        keys.push({label: k, value: JSON.parse(messages[index].key)[k]});
      });
      Object.keys(JSON.parse(messages[index].value)).forEach(function(k) {
        arr.push({label: k, value: JSON.parse(messages[index].value)[k]});
      });
      return (
        <div
          key={key}
          style={style}
          className="message-row columns ws-message-list is-multiline"
          onClick={onShowRowDetails.bind(this, messages[index])}
        >
          <div className="column is-2">
            <div>Index</div>
            {index}
          </div>
          {keys.map(item => <MessageListItem className='key' key={item.label} label={item.label} value={item.value} />)}
          {arr.map(item => <MessageListItem key={item.label} label={item.label} value={item.value} />)}
        </div>
      )
    }

    return (
      <div>
        <ListItemDetails key={message.key} value={message.value} onCommitMessage={onCommitMessage} onShowRowDetails={onShowRowDetails}/>
        <nav className="panel">
          <div className="panel-block">
            <AutoSizer className="autosizer-bulma-fix">
              {({ height, width, disableHeight=true }) => (
                <List
                  ref={(list) => {
                    this.list = list
                  }}
                  width={width}
                  height={290}
                  rowCount={messages.length}
                  rowHeight={160}
                  rowRenderer={rowRenderer}
                />
              )}
            </AutoSizer>
          </div>
        </nav>
      </div>
    )
  }
}

class MessageListItem extends React.Component {
  render() {
    return (
      <div className="column is-2">
        <div>{this.props.label}</div>
        {this.props.value}
      </div>
    )
  }
}

class ListItemDetails extends React.Component {
  render() {
    let arr = [], props = this.props;
    if (props.value) {
      Object.keys(JSON.parse(props.value)).forEach(function(k) {
        arr.push({label: k, value: JSON.parse(props.value)[k]});
      });
    }
    return (
      <div>
        {arr.length > 0 ? (
          <div className="notification content list-item-details">
            <ul>
              {arr.map(item => <ListItemDetailsRow key={item.label} label={item.label} value={item.value} />)}
            </ul>
            <button className="button is-info is-small" onClick={props.onCommitMessage.bind(null, props.value)}>Commit</button>
            <button className="button is-white is-small" onClick={props.onShowRowDetails.bind(null, {})}>Hide details</button>
          </div>
        ) : ('')}
      </div>
    )
  }
}

class ListItemDetailsRow extends React.Component {
  render() {
    return (
      <li><strong>{this.props.label}</strong>: {this.props.value}</li>
    )
  }
}

MessageList.defaultProps = {
};

MessageList.propTypes = {
  onCommitMessage: PropTypes.func,
  message: PropTypes.object
};

const mapStateToProps = state => ({
  message: state.session.message,
  messages: state.session.messages
});

const mapDispatchToProps = {
  ...Action,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);

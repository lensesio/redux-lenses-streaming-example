import React from 'react';
import { connect } from 'react-redux';
import { Actions as KafkaActions } from 'redux-lenses-streaming';

import Connect from '../components/Connect';
import Publish from '../components/Publish';
import Subscribe from '../components/Subscribe';
import MessageList from '../components/MessageList';

class MainContainer extends React.Component {
  render() {
    const { messages, commitMessage } = this.props;
    const showMessageList = messages.length ? (
      <MessageList messages={messages} onCommitMessage={commitMessage} />
    ) : <div />;

    return (
      <div className="container app">
        <div className="columns">
          <div className="column">
            <Connect />
          </div>
          <div className="column">
            <Publish />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Subscribe />
            {showMessageList}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Defaults and types
 */
MainContainer.defaultProps = {

};

MainContainer.propTypes = {
};

/**
 * Redux mappings
 */
const mapStateToProps = state => ({
  messages: state.session.messages,
});

const mapDispatchToProps = dispatch => ({
  commitMessage: (message) => {
    dispatch(KafkaActions.commit(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

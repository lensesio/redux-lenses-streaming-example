import React from 'react';
import { connect } from 'react-redux';

import Connect from '../components/Connect';
import Subscribe from '../components/Subscribe';
import MessageList from '../components/MessageList';

class MainContainer extends React.Component {
  render() {
    const { messages, commit } = this.props;

    return (
      <div className="container app">
        <div className="columns">
          <div className="column">
            <Connect />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Subscribe />
            {messages.length ? (
              <MessageList messages={messages} onCommitMessage={commit} />
            ) : null}
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

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

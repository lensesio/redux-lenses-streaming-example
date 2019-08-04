import React from 'react';
import { connect } from 'react-redux';
import { Actions as KafkaActions } from 'redux-lenses-streaming';

import Connect from '../components/Connect';
import Publish from '../components/Publish';
import Subscribe from '../components/Subscribe';
import MessageList from '../components/MessageList';
import Chart from '../components/Chart';
import useTab from '../util/useTab';

const MainContainer = ({messages, commit}) => {
  const [activeTab, {isActiveTab, setActiveTab}] = useTab(['list', 'visualization']);

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
          <div className="panel">
            <Subscribe />
          </div>

          {messages.length ? (
            <>
            <div className="panel">
              <div className="panel-block">
                <div className="tabs">
                  <ul>
                    <li className={isActiveTab('list') ? 'is-active' : ''}>
                      <a onClick={setActiveTab('list')}>Messages list</a>
                    </li>
                    <li className={isActiveTab('visualization') ? 'is-active' : ''}>
                      <a onClick={setActiveTab('visualization')}>Visualization</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {
              isActiveTab('list') &&
                <MessageList messages={messages} onCommitMessage={commit} />
            }

            {
              isActiveTab('visualization') &&
                <Chart messages={messages} />
            }
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

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
  ...KafkaActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

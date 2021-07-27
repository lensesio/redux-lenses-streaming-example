import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import Connect from '../components/Connect';
import Subscribe from '../components/Subscribe';
import MessageList from '../components/MessageList';
import { Message, State } from '../config/state';

export type MainContainerProps = {
  commit: (message: Message) => void;
}

export type MainContainerStateProps = {
  messages: Message[]
}

const _MainContainer: React.FC<
  MainContainerProps & MainContainerStateProps
> = ({ messages, commit }) => (
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
  
const mapStateToProps: MapStateToProps<
  MainContainerStateProps,
  MainContainerProps,
  State
> = state => ({
  messages: state.session.messages,
});

export const MainContainer = connect(mapStateToProps)(_MainContainer);
    
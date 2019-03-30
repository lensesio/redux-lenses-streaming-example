import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Topics from './Topics';
import { Actions as KafkaActions } from 'redux-lenses-streaming';
import { Action } from '../actions';


class Subscribe extends React.Component {
  state = {
    sqls: ''
  }

  onSqlsChange = (event) => {
    this.setState({ sqls: event.target.value });
  }

  onSubscribe = () => {
    const request = { sqls: this.state.sqls};
    this.props.subscribe(request);
  }

  onClearMessages = () => {
    this.props.clearMessages();
  }

  onUnsubscribe = (topic) => {
    const request = { topics: [topic] };
    this.props.unsubscribe(request);
  }

  render() {
    const { messages, subscriptions, connection } = this.props;
    const { sqls } = this.state;
    const btnStyle = classnames('button is-small is-info');

    return (
      <nav className="ws-subscribe panel">
        <div className="panel-heading">
          <div className="field has-addons">
            <p className="control is-expanded">
              <textarea
                rows="3"
                className="textarea is-small is-info"
                placeholder="SQLS"
                value={sqls}
                onChange={this.onSqlsChange}
              />
            </p>
          </div>
        </div>
        <div className="panel-block">
          <div className="control">
            <button
              style={{ marginRight: '10px' }}
              onClick={this.onSubscribe}
              className={btnStyle}
              disabled={!connection || !this.state.sqls}
            >
              Subscribe
            </button>
            <button
              onClick={this.onClearMessages}
              className="button is-small is-danger"
              disabled={!connection}
            >
              Clear Messages
            </button>
          </div>
          <Topics subscriptions={subscriptions} onUnsubscribe={this.onUnsubscribe} />
        </div>
        <div className="panel-block">
          <div className="control">
            Number of messages: {messages.length}
          </div>
        </div>
      </nav>
    );
  }
}

Subscribe.defaultProps = {
};

Subscribe.propTypes = {
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  subscriptions: state.lenses.subscriptions,
  connection: state.lenses.connection,
  messages: state.session.messages,
});

const mapDispatchToProps = {
  ...KafkaActions,
  ...Action,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);

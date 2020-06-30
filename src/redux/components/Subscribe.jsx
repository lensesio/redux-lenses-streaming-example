import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Action } from "../actions";
import Button from "./Button";

class Subscribe extends React.Component {
  constructor(props) {
    super(props);

    this.onSqlsChange = this.onSqlsChange.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.onUnsubscribe = this.onUnsubscribe.bind(this);
    this.onClearMessages = this.onClearMessages.bind(this);

    this.state = {
      sqls: "",
    };
  }

  onSqlsChange(event) {
    this.setState({ sqls: event.target.value });
  }

  onSubscribe() {
    const request = {
      sqls: this.state.sqls,
    };
  }

  onClearMessages() {
    this.props.clearMessages();
  }

  onUnsubscribe(topic) {
  }

  render() {
    const { messages } = this.props;
    const { sqls } = this.state;

    const btnStyle = classnames("button is-small is-info");

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
            <Button
              style={{ marginRight: "10px" }}
              onClick={this.onSubscribe}
              className={btnStyle}
              disabled={!this.state.sqls}
            >
              Subscribe
            </Button>
            <Button
              onClick={this.onClearMessages}
              className="button is-small is-danger"
            >
              Clear Messages
            </Button>
          </div>
        </div>
        <div className="panel-block">
          <div className="control">Number of messages: {messages.length}</div>
        </div>
      </nav>
    );
  }
}

Subscribe.defaultProps = {};

Subscribe.propTypes = {
};

const mapStateToProps = (state) => ({
  messages: state.session.messages,
});

const mapDispatchToProps = {
  ...Action,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);

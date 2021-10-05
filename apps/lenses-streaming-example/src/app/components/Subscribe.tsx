import React, { useState } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { actions } from "../actions";
import Button from "./Button";
import { Message, State } from "../config/state";

export type SubscribeStateProps = {
  messages: Message[];
};

export type SubscribeProps = {
  clearMessages: ()=>void
};

const _Subscribe: React.FC<SubscribeProps & SubscribeStateProps> = ({
  messages,
  clearMessages,
}) => {
  const [sqls, setSqlState] = useState("");

  const onSqlsChange = (event:React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    const value = target.value;

    setSqlState(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubscribe = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onUnsubscribe = (topic:string) => {};

  const btnStyle = classnames("button is-small is-info");

  return (
    <nav className="ws-subscribe panel">
      <div className="panel-heading">
        <div className="field has-addons">
          <p className="control is-expanded">
            <textarea
              className="textarea is-small is-info"
              placeholder="SQLS"
              value={sqls}
              onChange={onSqlsChange}
            />
          </p>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <Button
            style={{ marginRight: "10px" }}
            onClick={onSubscribe}
            className={btnStyle}
            disabled={!sqls}
          >
            Subscribe
          </Button>
          <Button
            onClick={clearMessages}
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

const mapStateToProps = (state:State) => ({
  messages: state.session.messages,
});

const mapDispatchToProps = {
  ...actions,
};

const Subscribe = connect(mapStateToProps, mapDispatchToProps)(_Subscribe);

export default Subscribe;

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Button from "./Button";

class Publish extends React.Component {
  constructor(props) {
    super(props);

    this.onPublishClick = this.onPublishClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      selectedTopic: "",
      pubKey: "",
      pubValue: "",
    };
  }

  onPublishClick() {
    const { pubKey, pubValue, selectedTopic } = this.state;

    const request = {
      topic: selectedTopic,
      key: pubKey,
      value: pubValue,
    };

    this.props.publish(request);
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "selectedTopic":
      case "pubKey":
      case "pubValue":
        this.setState({ [name]: value });
        break;
      default:
        break;
    }
  }

  render() {
    const { pubKey, pubValue, selectedTopic } = this.state;

    const btnStyle = classnames("button is-fullwidth is-success");

    return (
      <nav className="panel">
        <p className="panel-heading">Publish Message</p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              name="pubKey"
              className="input is-small"
              type="text"
              placeholder="Key"
              value={pubKey}
              onChange={this.onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-comment" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              name="pubValue"
              className="input is-small"
              type="text"
              placeholder="Message"
              value={pubValue}
              onChange={this.onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-comment" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              name="selectedTopic"
              className="input is-small"
              type="text"
              placeholder="Topic"
              value={selectedTopic}
              onChange={this.onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-comment" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <Button
            onClick={this.onPublishClick}
            className={btnStyle}
            disabled={!connection}
          >
            Publish
          </Button>
        </div>
      </nav>
    );
  }
}

Publish.defaultProps = {};

Publish.propTypes = {
  publish: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Publish);

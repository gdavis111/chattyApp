import React, {Component} from 'react';


class Message extends Component {
  render() {
    console.log("Rendering <Message />")
    return (
          <div className="message">
            <span className="message-username">{this.props.userID}</span>
            <span className="message-content">{this.props.msgContent}</span>
          </div>
    );
  }
}
export default Message;



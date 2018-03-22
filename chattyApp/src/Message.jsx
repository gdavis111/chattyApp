import React, {Component} from 'react';


class Message extends Component {
  render() {
    console.log("Rendering <Message />")

    if (this.props.msgType === 'incomingMessage') {
      return (
            <div className="message">
              <span style={{color:this.props.userColor}} className="message-username">{this.props.userID}</span>
              <span className="message-content">{this.props.msgContent}</span>
            </div>
      );
    } else if (this.props.msgType === 'incomingNotification') {
      return (
            <div className="message system">
              <span className="notification-content">{this.props.msgContent}</span>
            </div>
      );
    }
  }
}
export default Message;



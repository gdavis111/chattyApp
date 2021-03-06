import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />")
    /* Goes through list of messages to print each one */
    const messageListItems = this.props.messages.map((message) => {
      return(<Message key={message.id} userID={message.username} msgContent={message.content} msgType={message.type} userColor={message.color} />);
    });

    return (
      <main className="messages">
        {messageListItems}
      </main>
    );
  }
}

export default MessageList;

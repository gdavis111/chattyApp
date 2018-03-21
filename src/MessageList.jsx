import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />")

    const messageListItems = this.props.messages.map((message) => {
      return(<Message key={message.id} userID={message.username} msgContent={message.content} />);
    });

    return (
      <main className="messages">
        {messageListItems}
      </main>
    );
  }
}

export default MessageList;

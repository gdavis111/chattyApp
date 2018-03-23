import React, {Component} from 'react';

class ChatBar extends Component {
  /* Function that runs when user hits enter in message field */
  onKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.addMessage(event.target.value);
      event.target.value = '';
    }
  }
  /* Function that runs when user hits enter in name field */
  userChange = (event) => {
    if(event.key === 'Enter'){
      this.props.handleChange(event.target.value);
    }
  }

  render() {
    console.log("Rendering <ChatBar />")
    return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyPress={this.userChange} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onKeyPress} />
        </footer>
    );
  }
}
export default ChatBar;


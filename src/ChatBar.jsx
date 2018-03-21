import React, {Component} from 'react';


class ChatBar extends Component {

  onKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.addMessage(event.target.value);
      event.target.value = '';
    }
  }





  render() {
    console.log("Rendering <ChatBar />")
    return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onKeyPress} />
        </footer>
    );
  }
}
export default ChatBar;


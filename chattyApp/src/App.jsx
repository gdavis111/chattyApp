import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.ws = new WebSocket("ws://localhost:3001/");

    this.state = {
      currentUser: {name: "Anonymous"}, // if currentUser is not specified, the user is Anonymous
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.ws.onopen = function (event) {
      console.log("Connected to the websocket Server, Cool!");
    };

    this.ws.onmessage = event => {
      console.log('Here is an event: ', event); // testing


      /* !!!!!!!!!!!!!! TODO: make if/else that handles login or logout type? !!!!!!!!!!!!!!!!!! */

      let data = JSON.parse(event.data);

      let messages = [...this.state.messages, data];
      this.setState({ messages });
    };
  }

  addMessage(msg) {
    const newMessageObj = {
      type: 'postMessage', //new
      username: this.state.currentUser.name,
      content: msg
    }
    this.ws.send(JSON.stringify(newMessageObj));
  }

  handleChange(inputName) {
    let oldUser = this.state.currentUser.name; //new
    const newUserObj = { //new
      type: 'postNotification',
      content: `${oldUser} has changed their name to ${inputName}`
    }
    this.ws.send(JSON.stringify(newUserObj));
    // change state so messages will show from new name
    let theUser = {name: inputName}
    this.setState({currentUser: theUser});
  }

  render() {
    console.log("Rendering <App />")
    return (
      <div>
        <NavBar  />
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser} handleChange={this.handleChange} />
      </div>
    );
  }
}

export default App;


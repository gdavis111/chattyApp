import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {

  constructor(props) {
    super(props);
    this.ws = new WebSocket("ws://localhost:3001/");

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }


    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {


    this.ws.onopen = function (event) {
      console.log("Connected to the websocket Server, Cool!");
    };

    this.ws.onmessage = event => {
      console.log('Here is an event', event); // testing

      let data = JSON.parse(event.data);
      let messages = [...this.state.messages, data];
      this.setState({ messages });
    };

  }

  addMessage(msg) {
    const newMessageObj = {
      username: this.state.currentUser.name,
      content: msg
    }
    this.ws.send(JSON.stringify(newMessageObj));

    // let currentState = this.state;
    // currentstate.messages.push(newMessageObj);
    // this.setState({ messages: this.state.messages.concat(newMessageObj) });
  }



  render() {
    console.log("Rendering <App />")
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;


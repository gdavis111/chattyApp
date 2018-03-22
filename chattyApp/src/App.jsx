import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.ws = new WebSocket("ws://localhost:3001/");

    this.state = {
      currentUser:  { name: "Anonymous", color: 'random' }, // if currentUser is not specified, the user is Anonymous
      messages: [],
      userCount: 0
    }
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.ws.onopen = function (event) {
      console.log("Connected to the websocket Server!");
    };

    this.ws.onmessage = event => {
      let data = JSON.parse(event.data);
      // if someone logs in, create login message object and send to server
      if (data.type === 'incomingLogin') {
        this.setState({userCount: data.userCount});
        let newLoginObj = {
          type: 'postLogin',
          content: `${this.state.currentUser.name} has just logged in.`
        }
        this.ws.send(JSON.stringify(newLoginObj));
        // if someone logs out, create logout message object and send to server
      } else if (data.type === 'incomingLogout') {
        this.setState({userCount: data.userCount});
        // if data.type is not incomingLogout but has userCount, set userCount and add as message
      } else if (data.userCount) {
        this.setState({userCount: data.userCount})
        let messages = [...this.state.messages, data];
        this.setState({ messages });
      } else {
        let messages = [...this.state.messages, data];
        this.setState({ messages });
      }
    };
    window.onbeforeunload = (event) => {
      let newLogoutObj = {
        type: 'postLogout',
        content: `${this.state.currentUser.name} has just logged out.`
      }
      this.ws.send(JSON.stringify(newLogoutObj));
    }
  }

  /* FUNCTION TO GET RANDOM COLOUR */
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addMessage(msg) {
    const newMessageObj = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: msg,
      color: this.state.currentUser.color
    }
    this.ws.send(JSON.stringify(newMessageObj));
  }

  handleChange(inputName) {
    let oldUser = this.state.currentUser.name;
    const newUserObj = {
      type: 'postNotification',
      content: `${oldUser} has changed their name to ${inputName}`
    }
    this.ws.send(JSON.stringify(newUserObj));
    /* adding colour to user and changing state to include name and random colour */
    let theUser = {name: inputName, color: this.getRandomColor()}
    this.setState({currentUser: theUser});
    console.log(this.state);
  }

  render() {
    console.log("Rendering <App />")
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser} handleChange={this.handleChange} />
      </div>
    );
  }
}

export default App;


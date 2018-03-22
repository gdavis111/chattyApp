import React, {Component} from 'react';


class NavBar extends Component {
  render() {
    console.log("Rendering <NavBar />")
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h2 className="usersOnline">Users Online: {this.props.userCount}</h2>
        </nav>
    );
  }
}
export default NavBar;



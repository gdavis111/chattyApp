# Chatty App

A single page, multi-user, live chatroom app that updates for all users whenever a message is sent or if a user logs in, out or changes their username.  All users start as 'Anonymous' unless they decide to input their own name.  If a user decides to input a new name and hits enter, a random colour will be assigned to that name.  Whenever they send a message, the name beside the message will show up in that colour.

## Getting Started

1. Fork this repository, then clone your fork of this repository to your machine.
2. Install dependencies using the `npm install` command from within both the chattyApp folder and the chattyServer folder.
3. Start the `chattyServer` server using the `node server` command within that folder.
4. Start the `chattyApp` server by running `npm start` within that folder.  The app will be served at <http://localhost:3000/>.
5. Go to <http://localhost:3000/> in your browser.

## Final Product

!["Screenshot of the app with some coversation"]


## Dependencies

### chattyApp folder:

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom
* ws

### chattyServer folder:

* express
* uuid
* ws
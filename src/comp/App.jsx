import React from 'react';
import ReactDOM from 'react-dom';
import {ajax, BASE_URL} from '~/src/common/ajax';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ChatInput from './ChatInput.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.params.username);
    this.state = {
      messages: [],
      latestTimestamp: 0,
      username: this.props.params.username,
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);

    function poll(thisRef) {
      let content = JSON.stringify({
        timestamp: thisRef.state.latestTimestamp,
      });

      ajax("POST", BASE_URL + "/chatroom/showmessages", content,
        [{header: "Content-Type", value: "application/json"}])
        .then(function(res) {
          let messages = JSON.parse(res);
          for (let message of messages) {
            thisRef.addMessage(message);
            thisRef.state.latestTimestamp = message.timestamp;
          }
          thisRef.forceUpdate();
          poll(thisRef);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    poll(this);
  }

  componentDidUpdate() {
    console.log("Hey");
    let node = ReactDOM.findDOMNode(this.refs.chatBox);
    node.scroll({
      top: node.scrollHeight,
      behaviour: 'smooth',
    });
  }

  addMessage(m) {
    const usernameStyle = {
      marginRight: '8em',
      fontSize: '0.8em',
      width: '6em',
      height: '4em',
      color: '#111',
      //backgroundColor: '#222',
      borderRadius: '1000px',
      textAlign: 'center',
    };

    const messageStyle = {
      marginLeft: '2em',
    };

    const divStyle = {
      margin: '0.4em',
      padding: '0.2em',
      paddingLeft: '1em',
    };

    const dividerStyle = {
      height: '80%',
      backgroundColor: '#DDD',
      padding: '0',
      width: '1.0px',
    }

    const spacerStyle = {
      width: '1em',
    }

    this.state.messages.push((
      <Paper style={divStyle}>
        <table style={{width: '100%'}}>
          <tr>
            <td style={usernameStyle}>{m.username}</td>
            <td style={spacerStyle}></td>
            <td style={dividerStyle}></td>
            <td style={spacerStyle}></td>
            <td style={messageStyle}>{m.message}</td>
          </tr>
        </table>
      </Paper>
    ));
  }

  sendMessage(m) {
    let thisRef = this;
    ajax("POST", BASE_URL + "/chatroom/sendmessage", 
      JSON.stringify({
        name: this.state.username,
        message: m,
      }),
      [{header: "Content-Type", value: "application/json"}])
    this.forceUpdate();
  }

  render() {
    const divStyle = {
      position: 'fixed',
      left: '10%',
      right: '10%',
      top: '5%',
      bottom: '5%',
    };

    const chatStyle = {
      position: 'abxolute',
      overflowY: 'auto', 
      scrollBehaviour: 'smooth',
      height: '90%',
    };

    const chatInputStyle = {
      width: '100%',
    };

    return (
      <div style={divStyle}>
        <MuiThemeProvider>
          <div>
            <Paper style={chatStyle} ref="chatBox">
              {this.state.messages}
            </Paper>
            <ChatInput style={chatInputStyle} sendFunc={this.sendMessage} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import {ajax, BASE_URL} from '~/src/common/ajax';

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
  }

  addMessage(m) {
    const usernameStyle = {
      marginRight: "3em",
    };
    const messageStyle = {
    };
    this.state.messages.push((
      <tr>
        <td style={usernameStyle}>{m.username}</td>
        <td style={messageStyle}>{m.message}</td>
      </tr>
    ));
  }

  componentDidMount() {
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
          thisRef.setState(thisRef.state);
          poll(thisRef);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    poll(this);
  }

  sendMessage(e) {
    let node = ReactDOM.findDOMNode(this.refs.input);
    let m = node.value;
    node.value = "";
    let thisRef = this;
      console.log(this.state.username);
    ajax("POST", BASE_URL + "/chatroom/sendmessage", 
      JSON.stringify({
        name: this.state.username,
        message: m,
      }),
      [{header: "Content-Type", value: "application/json"}])

    e.preventDefault();
  }

  render() {
    const divStyle = {
      width: '80%',
      margin: 'auto',
    };

    const tableStyle = {
      position: 'abxolute',
      height: '60%',
      tableLayout: 'fixed',
    };

    const formStyle = {
      width: '100%',
    };

    return (
      <div style={divStyle}>
        <div style={{overflowY: 'auto', height: '60%', }}>
          <table style={tableStyle}>
            {this.state.messages}
          </table>
        </div>
        <form style={formStyle} onSubmit={this.sendMessage}>
          <input type="text" id="message" ref="input" 
            autoComplete="off"
            placeholder="Enter message here..." 
            style={{width: '90%'}}/>
          <input type="submit" value="Send" 
            style={{width: '9%'}}/>
        </form>
      </div>
    );
  }
}

export default App;

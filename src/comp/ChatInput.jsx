import React from 'react';
import TextField from 'material-ui/TextField';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.state.inputValue = e.target.value;
    this.forceUpdate();
  }

  onSubmit(e) {
    this.props.sendFunc(this.state.inputValue);
    this.state.inputValue = "";
    e.preventDefault();
  }

  render() {
    const formStyle = {
      width: '100%',
    };

    return (<form style={formStyle} onSubmit={this.onSubmit}>
      <TextField 
        onChange={this.onInputChange}
        value={this.state.inputValue}
        placeholder="Enter message here..." 
        style={{width: '100%', marginTop: '1em'}}/>
    </form>
    );
  }
}

ChatInput.propTypes = {
  sendFunc: React.PropTypes.func.isRequired,
}

export default ChatInput;


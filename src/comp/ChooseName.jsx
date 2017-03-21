import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ChooseName extends React.Component {
  constructor(props) {
    super(props);

    this.submitName = this.submitName.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      inputValue: "",
    };

  }

  submitName() {
    this.context.router.push("/chat/" + this.state.inputValue);
  }

  onInputChange(e) {
    this.state.inputValue = e.target.value;
    this.forceUpdate(this.state);
  }

  render() {
    const formStyle = {
      position: 'fixed',
      left: '30%',
      top: '40%',
      width: '40%',
    };

    const textInputStyle = {
      fontSize: '18pt',
      width: '100%',
      backgroundColor: '#FFF',
      height: '4em'
    };

    const submitInputStyle = {
      position: 'absolute',
      left: '30%',
      top: '4em',
    };

    return (
      <MuiThemeProvider>
        <form onSubmit={this.submitName} style={formStyle}>
          <TextField 
            style={textInputStyle}
            placeholder="Enter your name"
            onChange={this.onInputChange} 
            value={this.state.inputValue} />
        </form>
      </MuiThemeProvider>
    );
  }
}

ChooseName.contextTypes = {
  router: React.PropTypes.object,
}

export default ChooseName;

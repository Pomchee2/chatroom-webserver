import React from 'react';
import ReactDOM from 'react-dom';

class ChooseName extends React.Component {
  constructor(props) {
    super(props);

    this.setName = this.setName.bind(this);
  }

  setName() {
    this.context.router.push("/chat/" + 
      ReactDOM.findDOMNode(this.refs.input).value);
  }

  render() {
    return <div>
        <form onSubmit={this.setName}>
          <input type="text" id="message" ref="input" 
            placeholder="Enter your name..." />
          <input type="submit" value="Send" />
        </form>
      </div>
  }
}

ChooseName.contextTypes = {
  router: React.PropTypes.object,
}

export default ChooseName;

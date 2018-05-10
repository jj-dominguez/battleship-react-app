import React, {Component} from 'react';
import '../App.css'

class Square extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<td className={this.props.className} id={this.props.id} onClick={this.props.onClick}></td>);
  }
}

export default Square;

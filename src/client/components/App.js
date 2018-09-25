import {Component} from 'inferno'
import {connect} from '@cerebral/inferno'
import {state, signal} from 'cerebral/lib/tags'


export default connect({
    counter: state`counter`,
    increment: signal`increment`,
    decrement: signal`decrement`
  },
  class App extends Component {
    render() {
      return (
        <div>
          <p>{this.props.counter}</p>
          <button onClick={this.props.increment}>+</button>
          <button onClick={this.props.decrement}>-</button>
        </div>
      );
    }
  }
)

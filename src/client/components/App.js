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
        <div className={"pure-g"}>
          <div className={"pure-u-1-3"} />
          <div className={"pure-u-1-3 text-center"}>
            <p>{this.props.counter}</p>
            <button className={"pure-button"} onClick={this.props.increment}>+</button>
            <button className={"pure-button"} onClick={this.props.decrement}>-</button>
          </div>
          <div className={"pure-u-1-3"} />
        </div>
      );
    }
  }
)

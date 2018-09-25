import {Module} from "cerebral";

function increment({state, props}) {
  state.set('counter', state.get('counter') + 1);
}

function decrement({state, props}) {
  state.set('counter', state.get('counter') - 1);
}

export default Module({
  state: {
    counter: 0
  },
  signals: {
    increment: [increment],
    decrement: [decrement]
  }
});

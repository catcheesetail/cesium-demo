import React, { Component } from 'react';
import EntityDemo from './entity';
import PrimitivesDemo from './primitives';

class App extends Component {
  state = {
    type: 'entity'
  }
  componentDidMount() {

  }
  render() {
    return (
      <div >
        <button onClick={() => {
          this.setState({ type: 'entity' })
        }}>entity</button>
        <button onClick={() => {
          this.setState({ type: 'primitives' })
        }}>primitives</button>
        {['entity'].includes(this.state.type) && <EntityDemo />}
        {['primitives'].includes(this.state.type) && <PrimitivesDemo />}
      </div>
    );
  }
}
export default App;

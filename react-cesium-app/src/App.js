import React, { Component } from 'react';
import EntityDemo from './entity';
import PrimitivesDemo from './primitives';
import ClassifyCesium3DTilesetComponent from './classifyModel';


class App extends Component {
  state = {
    type: 'classify'
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
           <button onClick={() => {
          this.setState({ type: 'classify' })
        }}>分层模型</button>
        {['entity'].includes(this.state.type) && <EntityDemo />}
        {['primitives'].includes(this.state.type) && <PrimitivesDemo />}
        {['classify'].includes(this.state.type)&&<ClassifyCesium3DTilesetComponent/>}
      </div>
    );
  }
}
export default App;

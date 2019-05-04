import React from 'react';
import './App.css';

import GoogleMapReact from 'google-map-react'
const key: string = 'your key';

interface ITextProps {
  cnt: number
}

class Text extends React.Component<ITextProps, {}> {
  render() {
    return (
      <span>{this.props.cnt}</span>
    )
  }
}


interface IAppState {
  cnts: number[]
}

class App extends React.Component<{}, IAppState> {
  constructor(props:any) {
    super(props)
    this.state = {
      cnts: [0,0]
    };
    this.click = this.click.bind(this);
  }
  click() {
    this.setState({
      cnts: this.state.cnts.map(cnt => cnt+1)
    });
  }
  render() {
    return (
      <div>
        {this.state.cnts.map((cnt, index) =>
          <Text cnt={cnt} key={index} />
        )}
        <button onClick={this.click}>click</button>
      </div>
    );
  }
}

export default App;

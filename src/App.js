import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components/Test'
import getStats from './getStats'
import base from './base'

// Chart test
import Totalvolume from './components/Totalvolume'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalDailyVolumes: {},
      array: []
    };
    base.fetch('stats', {
      context: this,
      asArray: true,
      then(data){
        console.log("CMON BABY")
        console.log(data);
        this.setState({
          totalDailyVolumes: data[1],
          array: data[0]
        })
      }
    });
    

  }

  async componentDidMount() {
    
    const totalDailyVolumes = await getStats();
    const array = []
    Object.keys(totalDailyVolumes).forEach(key => {
          let hash = { name: key }
          Object.keys(totalDailyVolumes[key]).forEach(key2 => {
            let symbol = this.symbol(key2)
            hash[symbol] = totalDailyVolumes[key][key2] 
          })
          array.push(hash)
      })
    console.log(array)

    base.post('stats', {
      data: { totalDailyVolumes, array },
      then(err) {
        if (!err) {
          console.log("seems to work...")
        }
      }
    });
  };

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }
 
  symbol(address) {
        if (address === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
            return "WETH"
        } else if (address === "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6") {
            return "RDN"
        } else if (address === "0xd26114cd6ee289accf82350c8d8487fedb8a0c07") {
            return "OMG"
        } else if (address === "0xdd974d5c2e2928dea5f71b9825b8b646686bd200") {
            return "KNC"
        } else if (address === "0x543ff227f64aa17ea132bf9886cab5db55dcaddf") {
            return "GEN"
        } else if (address === "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2") {
            return "MKR"
        } else if (address === "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359") {
            return "DAI"
        } else if (address === "0x6810e776880c02933d47db1b9fc05908e5386b96") {
            return "GNO"
        } else if (address = "total") {
          return "total"
        }
    }


  render() {
    
    return (
      <div className="App">
        <header className="App-header">
        <h1>GrachtenDX - DX Statistics</h1>
        <h3>Daily DutchX Volumes</h3>
        <Totalvolume array={this.state.array}></Totalvolume>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            by <code>hilmarx</code>
          </p>
        </header>
      </div>
    );
  }
}

export default App;

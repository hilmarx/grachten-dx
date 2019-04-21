import React, { Component } from 'react';
import logo from './dutch.png';
import './App.css';
import Test from './components/Test'
import getStats from './getStats'
import fetchToken from './fetchToken'
import base from './base'
import CustomizedTable from './components/CustomizedTable'

// Chart test
import Totalvolume from './components/Totalvolume'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalDailyVolumes: {},
      array: [],
      tokenPairs: []
    };

    base.fetch('stats', {
      context: this,
      asArray: true,
      then(data){
        console.log(data)
        this.setState({
          array: data[0],
          tokenPairs: data[1],
          totalDailyVolumes: data[2]
        })
      }
    });
    

  }

  async componentDidMount() {

    // +++++++++
    
    const totalDailyVolumes = await getStats();
    
    const array1 = []
    Object.keys(totalDailyVolumes).forEach(key => {
          let hash = { name: key }
          Object.keys(totalDailyVolumes[key]).forEach(key2 => {
            let symbol = this.symbol(key2)
            hash[symbol] = parseFloat(totalDailyVolumes[key][key2]).toFixed(2)
          })
          array1.push(hash)
      })
    const array2 = array1.slice().reverse()
    console.log(array2)

    // ##########
    const tokenPairs = await fetchToken();

    base.post('stats', {
      data: { totalDailyVolumes, array: array2, tokenPairs },
      then(err) {
        if (!err) {
          console.log("seems to work...")
        }
      }
    });

    this.setState({
      array: array2,
      tokenPairs: tokenPairs,
      totalDailyVolumes: totalDailyVolumes
    })
    
  
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
        <h2> 🇳🇱 DutchX Stats 🇳🇱 </h2>
        <h4>Daily DutchX Volumes in ETH (past 50 days)</h4>
        <Totalvolume array={this.state.array}></Totalvolume>
        <h4>Individual Token Pairs</h4>
        <CustomizedTable tp={this.state.tokenPairs}></CustomizedTable>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code> <a href="https://github.com/hilmarx" target="_blank" id="hx" >by hilmarx</a> </code>
        </p>
        
        </header>
      </div>
    );
  }
}

export default App;

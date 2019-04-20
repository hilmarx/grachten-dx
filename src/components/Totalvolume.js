import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

// Import stats
// import getStats from './../getStats'


// const stats = getStats();
// console.log(stats)

export default class Totalvolume extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';

    constructor(props) {
        super(props);
        this.state = {
            data: [],
          };      
    }

    // iterate over hash Keys 
    // create a line in data for each time period we have
    // input the date as name
    // iterate over props.totalVolumes and input Address: Value
    

  render() {
    const totalVolumes = this.props.array
    console.log("HERERERRE")
    console.log(totalVolumes)


    return (
      <BarChart
        width={1000}
        height={600}
        data={this.props.array}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Bar dataKey="DAI" stackId="a" fill="#8884d8" />
        <Bar dataKey="GEN" stackId="a" fill="#82ca9d" />
        <Bar dataKey="GNO" stackId="a" fill="#872a9d" />
        <Bar dataKey="MKR" stackId="a" fill="#871a9d" />
        <Bar dataKey="OMG" stackId="a" fill="#877a9d" />
        <Bar dataKey="RDN" stackId="a" fill="#876a9d" />
      </BarChart>
    );
  }
}

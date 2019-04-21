import React, { PureComponent } from 'react';
import {
  Area, AreaChart, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer
} from 'recharts';

// Import stats
// import getStats from './../getStats'


// const stats = getStats();
// console.log(stats)

export default class Totalvolume extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c1rLyqj1/';

    constructor(props) {
        super(props);
        this.state = {
            data: [],
          };      
    }

  render() {

    return (
      <ResponsiveContainer width={1000} height={500}>
        <AreaChart
          data={this.props.array}
          margin={{
            top: 20, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={6} height={50}  />
          <YAxis interval="preserveStart" width={70} />
          <Tooltip label="Daily Volumes" itemStyle={{ fontSize: '23px'}}/>
          <Legend />
          <Area type="monotone" dataKey="DAI" stackId="1" fill="#7b5fac" stroke="#7b5fac" />
          <Area type="monotone" dataKey="GEN" stackId="1" fill="#8f6aae" stroke="#8f6aae"/>
          <Area type="monotone" dataKey="GNO" stackId="1" fill="#cc6b8e" stroke="#cc6b8e"/>
          <Area type="monotone" dataKey="MKR" stackId="1" fill="#f18271" stroke="#f18271"/>
          <Area type="monotone" dataKey="OMG" stackId="1" fill="#f3a469" stroke="#f3a469"/>
          <Area type="monotone" dataKey="RDN" stackId="1" fill="#F7C9CA" stroke="#F7C9CA"/>
        </AreaChart>
      </ResponsiveContainer>
      
    );
  }
}

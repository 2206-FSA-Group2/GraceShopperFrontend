import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';



const Sales = (props) => {
    const {allData} = props
    return ( 
    <>
    <ResponsiveContainer width="40%" height="40%">
    <LineChart
      width={500}
      height={300}
      data={allData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="orderId" ><Label value="Revenue" position="center"/>   </XAxis>
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="usd" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
  </>
  )
}

export default Sales;
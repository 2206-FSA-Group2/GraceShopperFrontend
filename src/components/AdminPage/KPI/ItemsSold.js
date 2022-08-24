import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';




const ItemsSold = (props) => {
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
      <XAxis dataKey="orderId" > 
      <Label value="Items Sold" position="top"/>     
      </XAxis>
      <YAxis ></YAxis>
      
      <Tooltip />
      
      <Legend />
      
      <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
      
    </LineChart>
  </ResponsiveContainer>
  </>
  )
}

export default ItemsSold;
'use client'

import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const initialData = Array(20).fill(0).map((_, index) => ({
  name: index.toString(),
  value: Math.floor(Math.random() * 1000)
}))

export default function DynamicGraph() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const newData = [...currentData.slice(1), {
          name: (parseInt(currentData[currentData.length - 1].name) + 1).toString(),
          value: Math.floor(Math.random() * 1000)
        }]
        return newData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full bg-gray-800 p-3 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
          <YAxis stroke="#888" tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', border: 'none', fontSize: '12px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line type="monotone" dataKey="value" stroke="#c05621" strokeWidth={2} dot={false} /> {/* Orange color */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

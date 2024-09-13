'use client'

import React, { useState, useEffect } from 'react'

const DynamicText: React.FC = () => {
  const [text, setText] = useState('')
  const fullText = "Get Deeper And More Personalized Insights Into Your Training Data"

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(intervalId)
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="h-20 flex items-center justify-center">
      <h2 className="text-2xl font-bold text-white text-center">
        {text}
        <span className="animate-blink">|</span>
      </h2>
    </div>
  )
}

export default DynamicText
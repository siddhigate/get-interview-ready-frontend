import React from 'react'
import { useParams } from 'react-router-dom'

const BehavioralQuestion = () => {

  const {id} = useParams();

  return (
    <div>BehavioralQuestion: {id}</div>
  )
}

export default BehavioralQuestion
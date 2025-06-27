import React from 'react'
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
    const location = useLocation()

    console.log(location)

  return (
    <div>
        ResetPassword
    </div>
  )
}

export default ResetPassword
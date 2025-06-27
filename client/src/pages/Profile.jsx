import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'

const Profile = () => {
    const user = useSelector(state=>state.user)
    console.log("profiel",user)
  return (
    <div>
        <div className='w-16 h-16 bg-red-500 flex items-center justify-center rounded-full'>
               {
                user.avatar ? (
                    <img
                        alt={user.name}
                        src={user.avatar}
                        className="w-full h-full "

                        />
                ) : 
                ()
               }
        </div>
    </div>
  )
}

export default Profile
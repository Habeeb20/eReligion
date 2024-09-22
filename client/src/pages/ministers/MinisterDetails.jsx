import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const MinisterDetails = () => {
    const {id} = useParams();
    const [error, setError] = useState('')
    const [minister, setMinister] = useState(null) 

    useEffect(() => {
       const fetchMinisters= async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/minister/${id}`);
            const data= await response.json();
            setMinister(data)
        } catch (error) {
            console.error('Error fetching religious leaders details:', error);
            setError("'Error fetching religious leaders details:'")
        }
       }; fetchMinisters()
    }, [id])
    if(!minister){
        return <p>loading...</p>
    }
  return (
    <div>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <h3>Religious leaders</h3>
        <h2>first name:{minister.firstName}</h2>
        <h2>last  name:{minister.lastName}</h2>
        <h2>Email:{minister.email}</h2>
        <h2>Ministry name:{minister.ministryName}</h2>
        <h2>religion:{minister.religion}</h2>
        <h2>state:{minister.state}</h2>
        <h2>local government area:{minister.LGA}</h2>
        <h2>address:{minister.address}</h2>
      
    </div>
  )
}

export default MinisterDetails

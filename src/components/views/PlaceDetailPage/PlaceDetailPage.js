import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function PlaceDetailPage() {
  const { placeId } = useParams()
  axios.get(`/api/places/${placeId}`)
  .then(response => {
      console.log(response.data)
  }).catch(err => {
    console.log(err)
  })

  return (
    <div>PlaceDetailPage</div>
  )
}

export default PlaceDetailPage
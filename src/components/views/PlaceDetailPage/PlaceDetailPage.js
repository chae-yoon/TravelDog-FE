import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'antd'


function PlaceDetailPage() {
  const [imageList, setimageList] = useState([])
  const { placeId } = useParams()
  axios.get(`/api/places/${placeId}`)
  .then(response => {
      console.log(response.data)
      setimageList(response.data.imageList)
  }).catch(err => {
    console.log(err)
  })

  return (
    <>
      <Carousel autoplay>
        {imageList.map(image => <div key={image.id} className='carousel-wrapper'><img src={image.image} alt='place images' className='place-image' /></div>)}
      </Carousel>
    </>

  )
}

export default PlaceDetailPage
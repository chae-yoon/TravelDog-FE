import React, { useState, useEffect } from 'react'
import { Card,
          Pagination,
          Col,
          Row,
          ConfigProvider,
          Typography,
          Image } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import DefaultPlaceIMG from '../../../images/default_placeIMG.jpg'
import AverageStarComponent from '../AverageStarComponent/AverageStarComponent'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

function IndexPage() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCards = async () => {
      const response = await axios.get(`/api/places/?page=${page}&page_size=${pageSize}`);
      setCards(response.data.results);
      setTotalCount(response.data.count);
      console.log(response.data.results[0])
    };
    fetchCards();
  }, [page, pageSize])

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const handlePlaceDetail = (place_pk) => {
    navigate(`/places/${place_pk}`)
  }
  
  return (
  <>
    <Title style={{margin: '2rem 0 .75rem', fontWeight: 700}}>댕댕이와 여행하개!</Title>
    <Paragraph type="secondary">펫팸족을 위한 전국 반려견 동반 여행지를 추천해드려요.</Paragraph>
    <Row
      gutter={[16, 24]}
      style={{marginTop: '2rem', marginBottom: '2rem',}}
    >
      {cards.map((card) => (
        <Col flex="auto" sm={12} lg={8} xl={6} key={card.id}>
          {card.imageList.length > 0 ? (
            <Card
              hoverable
              cover={<Image alt="place_img" src={card.imageList[0].image} preview={false} />}
              onClick={() => handlePlaceDetail(card.pk)}
            >
              <Title level={4} ellipsis={true}>{card.title}</Title>
              <Row wrap={false} gutter={8} style={{marginTop: '.75rem'}}>
                <Col flex="none">
                  <FontAwesomeIcon icon={faLocationDot} style={{color: '#597ef7'}} />
                </Col>
                <Col flex="auto" className='card-address'>{card.address}</Col>
              </Row>
              <AverageStarComponent averageStar={card.average_star}/>
              <Text type="secondary">{card.review_count} reviews</Text> 
            </Card>
          ) : (
            <Card
            hoverable
            cover={<Image alt="default_img" src={DefaultPlaceIMG} preview={false} />}
            >
              <Title level={4} ellipsis={true}>{card.title}</Title>
              <Row wrap={false} gutter={8} style={{marginTop: '.75rem'}}>
                <Col flex="none">
                  <FontAwesomeIcon icon={faLocationDot} />
                </Col>
                <Col flex="auto" className='card-address'>{card.address}</Col>
              </Row>
              <AverageStarComponent averageStar={card.average_star}/>
              <Text type="secondary">{card.review_count} reviews</Text>
            </Card>
          )}
        </Col>
      ))}
    </Row>
    <Row justify="center">
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorPrimary: '#2f54eb',
            colorPrimaryBorder: '#adc6ff',
            colorPrimaryHover: '#597ef7',
          },
        },
      }}
      >
      <Pagination
        current={page}
        pageSize={pageSize}
        total={totalCount}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </ConfigProvider>
    </Row>
  </>
  )
}

export default IndexPage
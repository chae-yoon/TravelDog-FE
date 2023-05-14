import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
function AverageStarComponent({ averageStar }) {
  const starCount = Math.floor(averageStar);  // 소수점 버림 값 계산
  const stars = [];  // 별 이미지를 담을 배열 생성

  for (let i = 0; i < starCount; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{color: '#ffc53d'}} />);
  }

  // 별 이미지가 모자랄 경우 빈 별 이미지 추가
  for (let i = starCount; i < 5; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{color: '#d9d9d9'}} />);
  }

  return (
    <div style={{margin: '.25rem 0'}}>{stars} {averageStar}</div>
  )
}

export default AverageStarComponent
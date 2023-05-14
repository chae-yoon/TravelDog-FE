import React from 'react'
import { Button, Space, ConfigProvider, Row, Image, Col } from 'antd';
import FaviconIMG from '../../../images/FAVICON.png'
import LogoIMG from '../../../images/LOGO.png'
import { useNavigate } from 'react-router-dom'


function NavbarComponent() {
  const navigate = useNavigate()

  const onClickLogoHandler = () => {
    navigate('/')
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#394150',
            colorPrimaryActive: '#1b1f29',
            colorPrimaryBorder: '#6e7175',
            colorPrimaryHover: '#50545c',
            colorText: 'rgba(255, 255, 255, 0.88)'
          },
        },
      }}
      >
        <div>
        <Row justify="space-between">
          <Row align="top" gutter={[4, 0]} onClick={onClickLogoHandler}>
            <Col>
              <Image alt='favicon' src={FaviconIMG} preview={false} height={24} />
            </Col>
            <Col xs={0} sm={0} lg={20}>
              <Image alt='logo' src={LogoIMG} preview={false} height={52} />
            </Col>
          </Row>
          <Space>
            <Button type="text" style={{color: 'rgba(0, 0, 0, 0.88)'}} href='/login'>로그인</Button>
            <Button type="primary" href='/'>회원가입</Button>
          </Space>
        </Row>
        </div>
    </ConfigProvider>
  )
}

export default NavbarComponent
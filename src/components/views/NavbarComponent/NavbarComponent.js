import React, { useState } from 'react'
import FaviconIMG from '../../../images/FAVICON.png'
import LogoIMG from '../../../images/LOGO.png'
import { useNavigate } from 'react-router-dom'
import { authUser } from "../../../_actions/user_actions"; 
import { useDispatch } from "react-redux"; 
import { Button, Space, ConfigProvider, Row, Image, Col, Dropdown, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';


function NavbarComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoggin, setisLoggin] = useState(false)
  const [username, setusername] = useState('')
  
  const onClickLogoHandler = () => {
    navigate('/')
  }

  const onClickProfileHandler = () => {
    navigate('/')
  }
  
  const onClickLogoutHandler = () => {
    axios.delete('/api/accounts/').then(responser => {
      dispatch(authUser()).then(response => {
        if (!response.payload.isAuth) {
          setisLoggin(false)
          setusername('')
        }
      })
    })
  }

  const items = [
    {
      key: 'profile',
      label: '내 프로필',
      onClick: onClickProfileHandler,
    },
    {
      key: 'logout',
      label: '로그아웃',
      onClick: onClickLogoutHandler,
    },
  ]

  dispatch(authUser()).then(response => {
    if (response.payload.isAuth) {
      setisLoggin(true)
      setusername(response.payload.data.username)
    }
  });

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
          {isLoggin ? (
            <Dropdown
              menu={{items}}
              trigger={['click']}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    style={{
                      backgroundColor: '#aab1b5',
                    }}
                    icon={<UserOutlined />}
                  />
                  <span style={{color: '#394150'}}>
                    {username}
                  </span>
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Space>
              <Button type="text" style={{color: 'rgba(0, 0, 0, 0.88)'}} href='/login'>로그인</Button>
              <Button type="primary" href='/signup'>회원가입</Button>
            </Space>
          )}
          
        </Row>
        </div>
    </ConfigProvider>
  )
}

export default NavbarComponent
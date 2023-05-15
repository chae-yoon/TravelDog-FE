import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_actions'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Alert, Card, Typography, ConfigProvider, Row, Col, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import LoginDesign from '../../../images/loginDesign.png'

const { Title, Text, Link } = Typography

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoginFailed, setIsLoginFailed] = React.useState(false);
  const [form] = Form.useForm()
  
  const handleSubmit = (data) => {
    
    let body = {
      username: data.username,
      password: data.password
    }
    dispatch(loginUser(body)).then(response => {
      console.log(response)
      if (response.payload.loginSuccess) {
        navigate('/')
        console.log('success')
      } else {
        form.resetFields(['username', 'password'])
        setIsLoginFailed(true)
      }
    })
  }

  return (
    <Row className='relative login-row'>
      <Col span={24} md={12} className='login-bg-area'>
        <img className='login-bg' alt='bg-img' src={LoginDesign} />
      </Col>
      <Col span={24} md={12} className='login-area'>
      <Card className='login-card'>
        {isLoginFailed && (
          <Alert
            message="해당 정보와 일치하는 유저가 없습니다."
            type="error"
            showIcon
          />
        )}
        <Title level={4} style={{margin: '2rem 0 .75rem', fontWeight: 700}}>로그인</Title>
        <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: '#3C4E6A',
              colorPrimaryActive: '#242f45',
              colorPrimaryBorder: '#767d85',
              colorPrimaryHover: '#242f45',
            },
            Input: {
              colorPrimary: '#3c4e6a',
              colorPrimaryActive: '#242f45',
              colorPrimaryHover: '#767d85',
            },
            Typography: {
              colorLink: '#3c4e6a',
              colorLinkActive: '#242f45',
              colorLinkHover: '#767d85',
              colorPrimaryHover: '#242f45'
            }
          },
        }}
        >
          <Form form={form} onFinish={handleSubmit} className="login-form" size='large'>
            <Form.Item name="username" rules={[{ required: true, message: '닉네임을 입력해주세요' }]}>
              <Input prefix={<FontAwesomeIcon icon={faUser} style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
              <Input prefix={<FontAwesomeIcon icon={faKeyboard} style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="******" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                로그인하기
              </Button>
            </Form.Item>
            <Space>
              <Text type="secondary">아직 계정이 없으신가요?</Text>
              <Link fontWeightStrong href=''>회원가입하기</Link>
            </Space>
          </Form>
        </ConfigProvider>
      </Card>
      </Col>
    </Row>
  )
}

export default LoginPage
import React from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_actions'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Alert, Card, Typography, ConfigProvider, Space } from 'antd';

const { Title, Text, Link } = Typography

function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isRegisterFailed, setIsRegisterFailed] = React.useState(false);
  const [isHaveSameUsername, setIsHaveSameUsername] = React.useState(false);

  
  const handleSubmit = (data) => {
    
    let body = {
      username: data.username,
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number
    }
    dispatch(registerUser(body)).then(response => {
      console.log(response)
      if (response.payload.registerSuccess) {
        navigate('/login')
      } else {
        if (!response.payload.notExistUsername) {
          form.resetFields(['username', 'password', 'confirm'])
          setIsHaveSameUsername(true)
        } else {
          setIsRegisterFailed(true)
        }
      }
    })
  }
  return ( 
    <div>
      <Card className='signup-card'>
        {isRegisterFailed && (
          <Alert
            message="가입 형식에 맞지 않습니다."
            type="error"
            showIcon
          />
        )}
        {isHaveSameUsername && (
          <Alert
            message="중복된 닉네임이 있습니다."
            type="error"
            showIcon
          />
        )}
        <Title level={4} style={{margin: '2rem 0 .75rem', fontWeight: 700}}>회원가입</Title>
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
            },
          },
        }}
        >
          <Form form={form} onFinish={handleSubmit} size='large' layout="vertical">
            <Form.Item 
              name="username"
              label="닉네임"
              rules={[
                { 
                  required: true,
                  message: '닉네임을 입력해주세요' 
                }
                ]}
            >
              <Input placeholder="username" />
            </Form.Item>
            <Form.Item
              name="email"
              label="이메일"
              rules={[
                {
                  type: 'email',
                  message: '유효하지 않은 이메일입니다.',
                },
              ]}
            >
              <Input placeholder="example@sample.com"/>
            </Form.Item>
            <Form.Item
              name="password"
              label="비밀번호"
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력해주세요',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="******" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="비밀번호 확인"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '비밀번호를 한번 더 입력해주세요',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('두 비밀번호가 서로 일치하지 않습니다.'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="******" />
            </Form.Item>
            <Form.Item 
              name="first_name"
              label="성"
            >
              <Input placeholder="성을 입력해주세요" />
            </Form.Item>
            <Form.Item 
              name="last_name"
              label="이름"
            >
              <Input placeholder="이름을 입력해주세요" />
            </Form.Item>
            <Form.Item 
              name="phone_number"
              label="전화번호"
            >
              <Input placeholder="000-0000-0000" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                가입하기
              </Button>
            </Form.Item>
            <Space>
              <Text type="secondary">이미 계정이 있으신가요?</Text>
              <Link href='/login'>로그인하기</Link>
            </Space>
          </Form>
        </ConfigProvider>
      </Card>
    </div>
  )
}

export default SignupPage
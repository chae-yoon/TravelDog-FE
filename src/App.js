import 'antd/dist/reset.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import IndexPage from './components/views/IndexPage/IndexPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import SignupPage from './components/views/SignupPage/SignupPage';
import Auth from './hoc/auth'
import NavbarComponent from './components/views/NavbarComponent/NavbarComponent';
import PlaceDetailPage from './components/views/PlaceDetailPage/PlaceDetailPage';

const { Header, Content, Footer } = Layout;

const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #f0f0f0'
}

// import axios from 'axios';
function App() {
 
  // axios.get('/api/places/')
  // .then(response => console.log(response.data))
  return (
    <>
    <Layout>
      <Header>
          <NavbarComponent />
      </Header>
      <Content>
        <div
          style={{
            padding: 24,
            minHeight: 540,
          }}
        >
          <Routes>
            <Route path='/' element={Auth(IndexPage, null)} />
            <Route path='/login' element={Auth(LoginPage, false)} />
            <Route path='/signup' element={Auth(SignupPage, false)} />
            <Route path='/places/:placeId' element={Auth(PlaceDetailPage, null)} />
          </Routes>
        </div>
      </Content>
      <Footer style={footerStyle}>
        TravelDog ©2023 Created by Ant Design
      </Footer>
    </Layout>
    </>
  );
}

export default App;

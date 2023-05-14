import 'antd/dist/reset.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import NavbarComponent from './components/views/NavbarComponent/NavbarComponent';
import IndexPage from './components/views/IndexPage/IndexPage';
import LoginPage from './components/views/LoginPage/LoginPage';

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
            minHeight: 380,
          }}
        >
          <Routes>
            <Route path='/' element={<IndexPage/>} />
            <Route path='/login' element={<LoginPage/>} />
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

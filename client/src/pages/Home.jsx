import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router-dom';

function Home() {
  return (<>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Đi bộ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to = "/books" className='nav-link'>Quản lý sách</Link>
            <Link to="/function" className='nav-link'>Quản lý hàm</Link>
            <Link to="/procedure" className='nav-link'>Quản lý thủ tục</Link>
            <Link to="/mostsold" className='nav-link'>Tra sách bán chạy</Link>
            <Link to="/function2" className='nav-link'>Quản lý hàm 2</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
  </>
  );
}

export default Home;

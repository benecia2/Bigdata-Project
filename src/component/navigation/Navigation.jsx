import { React } from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/Navigation.css';
import logo from '../ui/logo.png';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  return (
    <div className='header'>
      <a href='/'><img src={logo} className='logo' alt='logo'/></a>
      <div className='nav'>
        <Nav.Link href='/overview' className={location.pathname === '/overview' ? 'active' : ''} >OVERVIEW</Nav.Link>
        <Nav.Link href='/statics' className={location.pathname === '/statics' ? 'active' : ''} >STATICS</Nav.Link> 
        <Nav.Link href='/analysis' className={location.pathname === '/analysis' ? 'active' : ''} >ANALYSIS</Nav.Link>
        <Nav.Link href='/recommend' className={location.pathname === '/recommend' ? 'active' : ''} >RECOMMEND</Nav.Link>
      </div>
    </div>
  );
};

export default Navigation;
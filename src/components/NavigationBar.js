import React, { Component }  from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar, Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import HubbleLogo from '../assets/hubbleLogo.png';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navButton{
    color: #bbb;
    margin-right: 20px;

    &:hover{
      color: white;
    }
  }
  .titleText {
    color: #FFFFF2;
    font-size: 20px;
    margin-left:5px;
    margin-bottom:0px;
    margin-top:4px;
  }
  .navText {
    color: #FFFFF2;
  }
`;


class NavigationBar extends Component{
   handleNavClick = async (backgroundPic, jumboPic) =>{
      this.props.onChangePage(backgroundPic, jumboPic);
   }
   render(){
      return(
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/hubble">
                  <Row>
                     <img src={HubbleLogo} width="30" height="30" className="d-inline-block align-top" style={{marginLeft:"20px"}} alt="React Bootstrap logo"/>
                     <h1 className="titleText"> Hubble! </h1>
                  </Row>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                    <Nav.Item>
                      <Nav.Link>
                        <Link className="navButton" to="/hubble"> <span className="navText"> Homers </span> </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link>
                        <Link className="navButton" to="/hubble/dailypic"> <span className="navText"> Daily Pic </span> </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link>
                        <Link className="navButton" to="/hubble/mars"> <span className="navText"> Mars </span> </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link>
                        <Link className="navButton" to="/hubble/naturalevents"> <span className="navText"> Natural Events </span> </Link>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
      );
   }
}
export default NavigationBar;

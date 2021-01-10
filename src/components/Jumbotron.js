import React, {Component} from 'react';
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
import backgroundHome from '../assets/backgroundMars.jpg';

const Styles = styled.div`
   .jumbo{
      background: backgroundHome;
      background-size: cover;
      height: 250px;
      margin:0;
      z-index: -2;
      padding:0;
   }
   .jumboHeader{
      position: relative;
      margin: auto;
      padding-top:25px;
      padding-left:75px;
      font-size: 55px;
      font-weight: 800;
      color: #f7f7f7;
   }
   .jumboText{
      position: relative;
      margin: auto;
      padding-left:75px;
      font-size: 35px;
      font-weight: 400;
      color: #f7f7f7;

   }
`;
const StyledJumbo = styled(Jumbo)`
  background: url(${props => (props.jumboPic)});
  background-size: cover;
  height: 250px;
  margin:0;
  z-index: -2;
  padding:0;
`;


class Jumbotron extends Component{
   constructor(props){
     super(props);
   }
   render(){
      return(
        <Styles>
          <StyledJumbo jumboPic={this.props.jumboColor}>
            <h1 className="jumboHeader"> {this.props.jumboHeader} </h1>
            <h1 className="jumboText"> {this.props.jumboText} </h1>
          </StyledJumbo>
        </Styles>
     );
  }
}
export default Jumbotron;

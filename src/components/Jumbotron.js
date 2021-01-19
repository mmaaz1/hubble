import React, {Component} from 'react';
import {Jumbotron as Jumbo} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
   .jumboHeader{
      position: relative;
      margin: auto;
      padding-top:25px;
      padding-left:75px;
      font-size: 55px;
      font-weight: 630;
      color: #f7f7f7;
   }
   .jumboText{
      position: relative;
      margin: auto;
      padding-left:75px;
      font-size: 35px;
      font-weight: 210;
      color: #f7f7f7;

   }
`;
const StyledJumbo = styled(Jumbo)`
  background: url(${props => (props.jumbopic)});
  background-size: cover;
  height: 250px;
  margin:0;
  z-index: -2;
  padding:0;
`;


class Jumbotron extends Component{
   render(){
      return(
        <Styles>
          <StyledJumbo jumbopic={this.props.jumboColor} fluid>
            <h1 className="jumboHeader"> {this.props.jumboHeader} </h1>
            <h1 className="jumboText"> {this.props.jumboText} </h1>
          </StyledJumbo>
        </Styles>
     );
  }
}
export default Jumbotron;

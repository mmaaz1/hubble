import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {Component} from 'react';
import styled from 'styled-components';
import jumboDailyPic from './assets/jumboDaily.jpg';
import backgroundDailyPic from './assets/greenBackground.jpg';

import Particles from "react-particles-js";

const Styles = styled.div`
  .imgContainer {
    position: relative;
    margin: auto;
    overflow: hidden;
    background-color:rgba(245, 220, 224,0.1);
    background-size:cover;
  }
  .paragraphText {
    position:relative;
    margin:auto;
    color:#d3d3d3;
    text-align:justify;
    font-size:14px;
    margin-top: 15px;
    max-width:90%;
    transition:all 0.4s ease;
    color:#ffffaf;
    opacity: ${({btnClicked}) =>
      ((btnClicked === true) && '0') ||
      '1'
    };
  }
  .buttonText {
    position:relative;
    margin:auto;
    padding-bottom:10px;
    top:50%;
    font-size: 50px;
    font-weight:100;
    color:#f9e076;
  }
  .titleText {
    position:relative;
    margin:auto;
    padding-bottom:15px;
    padding-top:10px;
    color:#f9e076;
    text-align:center;
    font-size:50px;
    font-weight:750;
    transition:all 0.4s ease;
    opacity: ${({btnClicked}) =>
      ((btnClicked === true) && '0.1') ||
      '1'
    };
  }
  .spaceImage {
    position:relative;
    margin:auto;
    width:100%;
    display: block;
    height:475px;
    width:auto;
    transition:all 0.4s ease;
    opacity: ${({btnClicked}) =>
      ((btnClicked === true) && '0.1') ||
      '1'
    };
  }
  .backgroundContainer{
    width:100%;
    height: 100%;
    background: rgb(20, 11, 40);
    position: absolute;
  }
  .leftButton{
       position: absolute;
       margin:auto;
       padding:0px;
       padding-left:8px;
       padding-right:2px;
       right: 15px;
       border-radius:7px;
       background-color:#78005a;
       outline:none;
       border-width:3px;
       border-color:#5a0096;
       transition:all 0.3s ease;
       &:hover{
          box-shadow: inset 0 0 0 4px #5a0096;
       }
       &:active{
        -webkit-transform: scale(0.9);
        -ms-transform: scale(0.9);
        transform: scale(0.9);
       }
    }
    .rightButton{
         position: absolute;
         margin:auto;
         padding:0px;
         left: 15px;
         padding-left:2px;
         padding-right:8px;
         border-radius:7px;
         background-color: ${({styleDisable}) =>
            ((styleDisable === true) && '#783c5a') ||
            '#78005a'
         };

         outline:none;
         border-width:3px;
         border-color: ${({styleDisable}) =>
            ((styleDisable === true) && '#5a1e3c') ||
            '#5a0096'
         };
         transition:all 0.3s ease;
         &:hover{
            box-shadow: ${({styleDisable}) =>
               ((styleDisable === true) && 'inset 0 0 0 4px #5a1e3c') ||
               'inset 0 0 0 4px #5a0096'
            };
         }
         &:active{
         -webkit-transform: ${({styleDisable}) =>
            ((styleDisable === true) && 'scale(1)') ||
            'scale(0.9)'
         };
         -ms-transform: ${({styleDisable}) =>
            ((styleDisable === true) && 'scale(1)') ||
            'scale(0.9)'
         };
         transform: ${({styleDisable}) =>
            ((styleDisable === true) && 'scale(1)') ||
            'scale(0.9)'
         };
        }
      }
`;
const StyledCol = styled(Col)`
  position:relative;
  margin:auto;
`;
const StyledRow = styled(Row)`
  position:relative;
  padding:0px;
  margin:auto;
`;



class DailyPic extends Component{
  constructor(props){
    super(props);
    this.state = {
      width : 0,
      height : 0,
      pageDate: (new Date(((new Date()).getFullYear()),((new Date()).getMonth()),(((new Date()).getDate())-1))),
      backgroundEarth:"Loading Space",
      btnClicked:false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    await window.scrollTo(0, 0);
    await this.updateWindowDimensions();
    await window.addEventListener('resize', this.updateWindowDimensions);
    let jumboHeader = "Picture of the Day";
    let jumboText = "Check out today's Astronomic Image";
    await this.props.onChangePage(backgroundDailyPic, jumboDailyPic, jumboHeader, jumboText);
    await this.refreshBackgroundEarth();
  }
  async componentWillUnmount() {
    await window.removeEventListener('resize', this.updateWindowDimensions);
  }
  async updateWindowDimensions() {
    await this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  async refreshBackgroundEarth(){
    let urlL= "https://api.nasa.gov/planetary/apod?date=";
    let urlR= "&api_key=RhSXKj3CDHOwFcr4h7dZIPnX39GFJR8MUgjYNrKK";
    let formattedDate = (this.state.pageDate.getFullYear()) + "-" + (this.state.pageDate.getMonth()+1) + "-"+ (this.state.pageDate.getDate());
    let urlFull = urlL + formattedDate + urlR;

    let response = await fetch(urlFull);
    this.backgroundEarth = await response.json();
   setTimeout(function () {
      this.setState({
        backgroundEarth : this.backgroundEarth,
        btnClicked: false,
      });
   }.bind(this), 130);
  }
  handleClickLeft = async () =>{
    await this.setState({
      pageDate: (new Date(this.state.pageDate.getFullYear(),this.state.pageDate.getMonth(),this.state.pageDate.getDate()-1)),
      btnClicked: true,
    });
    await this.refreshBackgroundEarth();
  }
  handleClickRight = async () => {
    await this.setState({
      pageDate: (new Date(this.state.pageDate.getFullYear(),this.state.pageDate.getMonth(),this.state.pageDate.getDate()+1)),
      btnClicked: true,
    });
    await this.refreshBackgroundEarth();
  }
  checkDate(){
    let checkDate = new Date();
    checkDate = (new Date(((new Date()).getFullYear()),((new Date()).getMonth()),(((new Date()).getDate())-1)));
    return ((this.state.pageDate.getDate() === checkDate.getDate()) && (this.state.pageDate.getYear() === checkDate.getYear()) && this.state.pageDate.getMonth() === checkDate.getMonth());
  }
  returnNextDay(pageDate){
     return (new Date(pageDate.getFullYear(), pageDate.getMonth(), pageDate.getDate()+1))
 }

  render(){
    return(
      <Styles btnClicked={this.state.btnClicked} styleDisable={this.checkDate()} style={{minHeight:"715px", position:"relative", margin:"auto", paddingBottom:"24px"}} fluid>
           <Particles className="backgroundContainer" params={{
         	    "particles": {
         	        "number": {
         	            "value": 50,
         	        },
                   "color": {
                     "value": "#f9e076"
                   },
         	        "line_linked": {
         	            "enable": true,
         	            "opacity": 0.01
         	        },
         	        "move": {
         	            "speed": 0.15
         	        },
         	        "size": {
         	            "value": 1.3
         	        },
         	        "opacity": {
         	            "anim": {
         	                "enable": true,
         	                "speed": 0.5,
         	                "opacity_min": 0.25
         	            }
         	        }
         	    },
         	    "retina_detect": true
           }}/>
          <StyledCol xl={2} lg={1} md={1} sm={0} xs={0}>
          </StyledCol>
          <StyledCol xl={9} lg={10} md={10} sm={12} xs={12}>
              <StyledRow>
               <div style={{position:"relative", margin:"auto"}}>
                  <h1 className="titleText">{this.state.backgroundEarth.title + " (" + (this.returnNextDay(this.state.pageDate).getDate()) + "/" + (this.returnNextDay(this.state.pageDate).getMonth()+1) + "/"+ (this.returnNextDay(this.state.pageDate).getFullYear()) + ")"}</h1>
               </div>
              </StyledRow>
              <StyledRow style={{marginTop:"25px"}}>
               <StyledCol xl={1} lg={1} md={1} sm={1}>
                 <button type="button" className="leftButton" onClick={this.handleClickLeft}>
                   <h1 className="buttonText">{"<"}</h1>
                 </button>
               </StyledCol>
               <StyledCol xl={10} lg={10} md={10} sm={10}>
                 <div className="imgContainer">
                    { (this.state.backgroundEarth.media_type==="image") ? (<img src={this.state.backgroundEarth.url} alt={this.state.backgroundEarth.title} className="spaceImage"/>) : (<iframe alt={this.state.backgroundEarth.title} className="spaceImage" style={{width:this.state.width/2}} title={this.state.backgroundEarth.title} src={this.state.backgroundEarth.url}></iframe>)}
                 </div>
               </StyledCol>
               <StyledCol xl={1} lg={1} md={1} sm={1}>
                 <button type="button" className="rightButton" onClick={this.handleClickRight} disabled={this.checkDate()}>
                   <h1 className="buttonText">{">"}</h1>
                 </button>
               </StyledCol>
             </StyledRow>
             <StyledRow>
               <p className="paragraphText">{this.state.backgroundEarth.explanation}</p>
             </StyledRow>
          </StyledCol>
          <StyledCol xl={2} lg={1} md={1} sm={0} xs={0}></StyledCol>
      </Styles>
    );
  }
}
export default DailyPic;

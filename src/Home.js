import React, {Component} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import styled from 'styled-components';

import jumboHome from './assets/jumboHome.png';
import backgroundHome from './assets/test.jpg';
import {Link} from 'react-router-dom';
import DailyOne from './assets/homeDailyOne.jpg';
import DailyTwo from './assets/homeDailyTwo.jpg';
import DailyThree from './assets/homeDailyThree.jpg';
import MarsOne from './assets/homeMarsOne.jpg';
import MarsTwo from './assets/homeMarsTwo.jpg';
import MarsThree from './assets/homeMarsThree.jpg';
import NaturalThree from './assets/homeNaturalOne.jpg';
import NaturalTwo from './assets/homeNaturalTwo.jpg';
import NaturalOne from './assets/homeNaturalThree.webp';

import Particles from "react-particles-js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSegment = styled.div`
   .imgContainer {
       position: relative;
       margin: auto;
       overflow: hidden;
       padding-bottom: 0px;
       background-color:${props => props.lightColor};
       border-top-left-radius:10px;
       border-top-right-radius:10px;
       border-bottom-left-radius:20px;
       border-bottom-right-radius:20px;
       transition:all 0.15s ease;
       padding-bottom: ${({hover}) =>
          ((hover === true) && '20px') ||
          '0px'
        };
   }
     .homeImage{
         position:relative;
         margin:auto;
         display: block;
         height: 250px;
         width: auto;
         max-width:450px;
         padding-left:7px;
         padding-right:7px;
         padding-top:7px;
         border-top-left-radius: 15px;
         border-top-right-radius: 15px;
         transition:all 0.15s ease;
         filter: ${({hover}) =>
            ((hover === true) && "brightness(100%)") ||
            "brightness(25%)"
         };
     }
`

const Styles = styled.div`
 .titleContainer {
    position:relative;
    margin:auto;
   }
    .buttonText{
       position: relative;
       margin:auto;
       color:#FFFFFF;
       font-size:22px;
       text-decoration: none;
       padding:12px;
       padding-bottom:6px;
       padding-top:6px;
       transition:all 0.15s ease;
       &:hover{
          color:#f0f0f0;
       }
    }
    .titleText{
       position: relative;
       margin:auto;
       color:#FFFFFF;
       font-size:100px;
       font-weight:650;
    }
    .titleSubtext{
       position: relative;
       margin:auto;
       color:#FFFFFF;
       font-size:17px;
       font-weight:100;
       background-color:rgba(0,0,0,0.7);
       padding:10px;
       padding-top:4px;
       padding-bottom:4px;
       background-size:cover;
       border-radius: 7px;
    }
    .titleParatext{
       position: relative;
       margin:auto;
       color:#FFFFFF;
       font-size:25px;
       font-weight:350;
       text-align: center;
       margin-top:30px;
    }
    .backgroundContainer{
      width:100%;
      height: 100%;
      background: #2f2f2f;
      position: absolute;
    }
    a {
      &:hover {
         text-decoration: none;
      }
    }
`;
const StyledCard = styled(Card)`
  position:relative;
  margin:auto;
  color:#FFFFFF;
`;
const StyledCardText = styled(Card.Text)`
  color:#FFFFFF;
`;
const StyledCardTitle = styled(Card.Title)`
   color:#FFFFFF;
`;
const StyledCardHeader = styled(Card.Header)`
   color:#FFFFFF;
   transition:all 0.15s ease;
   background-color:${props => props.cardHover};
`;
const StyledSlider = styled(Slider)`
   margin-bottom:5px;
`;
const StyledCol = styled(Col)`
  position:relative;
  margin:auto;
`;
const StyledRow = styled(Row)`
  position:relative;
  padding-top:15px;
  padding-bottom:15px;
`;
const StyledContainer = styled(Container)`
  position:relative;
  margin:auto;
  padding:0px;
`;
const StyledButton = styled(Button)`
   padding:0px;
   margin-right:25px;
   border-width:0px;
   padding:0px;
   transition:all 0.15s ease;
   &:hover{
      box-shadow: inset 0 0 0 4px ${props => props.borderColor};
      -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
   }

`;

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      width:0,
      height:0,
      cardInfo:
         [
            {header:"Educate yourself daily with hand-picked visuals chosen by Astronauts", title:"Astronomers' Picture of the Day!", text:"Everyday our website is updated with a new eye-opening image along with a short paragaph describing the wonders of life which spans from renders of galaxies to a video of the Earth during the solar eclipse."},
            {header:"Wonder at what life on Mars thanks to our very own rover, Curiosity!", title:"Life at Mars", text:"Ever wondered what life on Mars would feel like? Head over to the Mars section to find out what the living conditions of Mars are currently like through weather reports and stunning photos of the Red Planet."},
            {header:"Have a top-down look at the Natural Events as they occur!", title:"Lansat Imagery of Earth's Natural Events", text:"Using NASA's Lanstat Imagery API and it's records of Natural Disasters, we were able to create an ever-updating database of Natural Events, giving you the power to take a look."},
         ],
      hover:[false,false,false],
      cardHover:[false,false,false],
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount(){
    await window.scrollTo(0, 0);
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      let jumboHeader = "Explore";
      let jumboText = "The Universe";
      this.props.onChangePage(backgroundHome, jumboHome, jumboHeader, jumboText);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions(){
    this.setState({width:window.innerWidth, height:window.innerHeight});
  }

  handleRowHover(num){
     let tempHover=this.state.cardHover;
     for(let i = 0; i < 3; i++){
        if(num === i)
            tempHover[i] = true;
     }
      let tempHover1=this.state.hover;
      for(let i = 0; i < 3; i++){
         if(num === i)
             tempHover1[i] = true;
      }
       this.setState({
          hover:tempHover1,
          cardHover:tempHover,
       });
 }
   handleRowUnhover(num){
      let tempHover=this.state.cardHover;
      for(let i = 0; i < 3; i++){
         if(num === i)
             tempHover[i] = false;
      }
       let tempHover1=this.state.hover;
       for(let i = 0; i < 3; i++){
          if(num === i)
              tempHover1[i] = false;
       }
        this.setState({
           hover:tempHover1,
           cardHover:tempHover,
        });
  }

  render(){
    return(
      <Styles style={{margin:"auto", position:"relative", paddingBottom:"50px"}}>
         <Particles className="backgroundContainer" params={{
             "particles": {
                 "move": {
                   "speed": 0.5
                },
                "color":{
                   "value": ["#FFFFFF", "#dcdcdc", "#b9b9b9", "#989898", "#787878", "#595959", "#3d3d3d", "#222222"]
                },
                "size": {
                   "value": 1.75
                }
             }
         }}/>
         <div className="titleContainer">
            <Particles className="backgroundContainer" params={{
            	    "particles": {
                      "number":{
                        "value":60
                      },
                       "move": {
                         "speed": 2.5
                      },
                      "color":{
                         "value": ["#FFFFFF", "#dcdcdc", "#b9b9b9", "#989898", "#787878", "#595959", "#3d3d3d", "#222222"]
                      },
                      "size": {
                         "value": 0
                      }
            	    }
	         }}/>
            <div style={{position:"relative", backgroundColor:"rgba(0,0,0,0.55)", backgroundSize:"cover"}}>
               <StyledRow style={{paddingTop:"0px", paddingBottom:"0px", maxWidth:"100%"}}>
                  <h1 className="titleText">Enter The Hubble</h1>
               </StyledRow>
               <StyledRow style={{paddingTop:"0px", maxWidth:"100%"}}>
                  <h1 className="titleSubtext">Mesmerizing Images | The Red Planet | Natural Disasters</h1>
               </StyledRow>
            </div>
         </div>
         <StyledCol xl={2} lg={1} md={1} sm={0} xs={0}>
         </StyledCol>
         <StyledCol xl={9} lg={10} md={10} sm={12} xs={12}>
            <StyledRow>
               <h1 className="titleParatext">With help from our friends at NASA, you are given the opportunity to feast at some breath-taking visuals from outer space. From mesmerizing photos hand-picked by the professionals working at Nasa to sceneries of Mars taken by Curiosity, explore the website and allow it to blow your mind. </h1>
            </StyledRow>

            <StyledSegment lightColor="rgba(43, 62, 79, 0.75)" hover={this.state.hover[0]} onMouseOver={() => this.handleRowHover(0)} onMouseOut={() => this.handleRowUnhover(0)}>
               <StyledRow style={{paddingTop:"30px"}}>
                  <StyledCol lg={5}>
                     <div className="imgContainer">
                       <StyledSlider {...{dots:true,dotsClass:"slick-dots"}}>
                         <div>
                           <img className="homeImage" src={DailyOne} alt={"TEMPORARY"}/>
                         </div>
                         <div>
                           <img className="homeImage" src={DailyTwo} alt={"TEMPORARY"}/>
                         </div>
                         <div>
                           <img className="homeImage" src={DailyThree} alt={"TEMPORARY"}/>
                         </div>
                       </StyledSlider>
                     </div>
                  </StyledCol>
                  <StyledCol lg={7}>
                     <StyledCard style={{backgroundColor:"rgba(26,36,56,0.5)"}}>
                        <StyledCardHeader cardHover={(this.state.cardHover[0]) ? "#3f5263" : "#2b3e4f"}>{this.state.cardInfo[0].header}</StyledCardHeader>
                        <Card.Body>
                           <StyledCardTitle>{this.state.cardInfo[0].title} </StyledCardTitle>
                           <StyledCardText> {this.state.cardInfo[0].text} </StyledCardText>
                           <StyledRow style={{float:"right"}} >
                              <StyledButton style={{backgroundColor:((this.state.cardHover[0]) ? "#3f5263" : "#2b3e4f")}} variant="success" borderColor="#22313f"> <Link className="navStyledButton" to="/hubble/dailypic"> <h1 textColor="#395b7a" className="buttonText">{"Check out Today's Picture"}</h1> </Link> </StyledButton>
                           </StyledRow>
                        </Card.Body>
                     </StyledCard>
                  </StyledCol>
               </StyledRow>
            </StyledSegment>

            <StyledSegment lightColor="rgba(134,53,17,0.75)" hover={this.state.hover[1]} onMouseOver={() => this.handleRowHover(1)} onMouseOut={() => this.handleRowUnhover(1)}>
               <StyledRow>
                  <StyledCol lg={7}>
                     <StyledCard style={{backgroundColor:"rgba(82,32,10,0.5)"}}>
                        <StyledCardHeader cardHover={(this.state.cardHover[1]) ? "#9a4825" : "#863511"}>{this.state.cardInfo[1].header}</StyledCardHeader>
                        <Card.Body>
                           <StyledCardTitle> {this.state.cardInfo[1].title} </StyledCardTitle>
                           <StyledCardText> {this.state.cardInfo[1].text} </StyledCardText>
                           <StyledRow style={{float:"right"}} >
                              <StyledButton variant="success" style={{backgroundColor:((this.state.cardHover[1]) ? "#9a4825" : "#863511")}} borderColor="#5e250c"> <Link className="navStyledButton" to="/hubble/mars"> <h1 textColor="#760015" className="buttonText">{"Visit Mars"}</h1> </Link> </StyledButton>
                           </StyledRow>
                        </Card.Body>
                     </StyledCard>
                  </StyledCol>
                  <StyledCol lg={5}>
                     <div className="imgContainer">
                       <StyledSlider {...{dots:true,dotsClass:"slick-dots"}}>
                         <div>
                           <img className="homeImage" src={MarsOne} alt={"TEMPORARY"}/>
                         </div>
                         <div>
                           <img className="homeImage" src={MarsTwo} alt={"TEMPORARY"}/>
                         </div>
                         <div>
                           <img className="homeImage" src={MarsThree} alt={"TEMPORARY"}/>
                         </div>
                       </StyledSlider>
                     </div>
                  </StyledCol>
               </StyledRow>
            </StyledSegment>

            <StyledSegment lightColor="rgba(80, 82, 9, 0.75)" hover={this.state.hover[2]} onMouseOver={() => this.handleRowHover(2)} onMouseOut={() => this.handleRowUnhover(2)}>
               <StyledRow>
                  <StyledCol lg={5}>
                     <div className="imgContainer">
                       <StyledSlider {...{dots:true,dotsClass:"slick-dots"}}>
                         <div>
                           <img className="homeImage" src={NaturalOne} alt={"TEMPORARY"}/>
                         </div>
                         <div>
                           <img className="homeImage" src={NaturalTwo} alt={"TEMPORARY"}/>
                         </div>
                         <div>
                           <img className="homeImage" src={NaturalThree} alt={"TEMPORARY"}/>
                         </div>
                       </StyledSlider>
                     </div>
                  </StyledCol>
                  <StyledCol lg={7}>
                     <StyledCard style={{backgroundColor:"rgba(35,36,4,0.5)"}}>
                        <StyledCardHeader cardHover={(this.state.cardHover[2]) ? "#64661d" : "#505209"}>{this.state.cardInfo[2].header}</StyledCardHeader>
                        <Card.Body>
                           <StyledCardTitle> {this.state.cardInfo[2].title} </StyledCardTitle>
                           <StyledCardText> {this.state.cardInfo[2].text} </StyledCardText>
                           <StyledRow style={{float:"right"}} >
                              <StyledButton style={{backgroundColor:((this.state.cardHover[2]) ? "#64661d" : "#505209")}} variant="success" borderColor="#393b07"> <Link className="navStyledButton" to="/hubble/naturalevents"> <h1 textColor="#767a0d" className="buttonText">{"Explore Natural Events"}</h1> </Link> </StyledButton>
                           </StyledRow>
                        </Card.Body>
                     </StyledCard>
                  </StyledCol>
               </StyledRow>
            </StyledSegment>
            </StyledCol>
            <StyledCol xl={2} lg={1} md={1} sm={0} xs={0}></StyledCol>
      </Styles>
    );
  }
}
export default Home;

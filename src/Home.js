import React, {Component} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import styled from 'styled-components';
import jumboHome from './assets/jumboHome.jpg';
import backgroundHome from './assets/blackBackground.jpg';
import DailyPicImage from "./assets/homeDailyPics.jpg";
import MilkyWayImage from "./assets/homeMilkyWay.jpg";
import MarsImage from "./assets/homeMars.jpg";
import NaturalEventsImage from "./assets/homeNaturalEvents.jpg";
import {Link} from 'react-router-dom';

const Styles = styled.div`
  .homeImage{
      position:relative;
      margin:auto;
      display: block;
      height: 250px;
      width: auto;
  }
 .imgContainer {
      position: relative;
      margin: auto;
      overflow: hidden;
 }
 .buttonText{
    position: relative;
    margin:auto;
    color:#FFFFFF;
    font-size:35px;
    text-decoration: none;
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
  padding-left:125px;
  padding-right:125px;
`;
const StyledButton = styled(Button)`
   padding:2px;
   border-width:4px;
`;

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      width:0,
      height:0,
      cardInfo:
         [
            {header:"Take a look at the universe through a different lens", title:"Welcome to the Hubble!", text:"Thanks to our friends at NASA, the website allows you to take a glance at some breath-taking visuals. From mesmerizing photos hand-picked by the professionals working at Nasa to sceneries of Mars taken by Curiosity, explore the website and allow it to blow your mind."},
            {header:"Educate yourself daily with hand-picked visuals chosen by Astronauts", title:"Astronomers' Picture of the Day!", text:"Everyday our website is updated with a new eye-opening image along with a short paragaph describing the wonders of life which spans from renders of galaxies to a video of the Earth during the solar eclipse."},
            {header:"Wonder at what life on Mars would be like with our constantly updated information provided by our very own rover, Curiosity!", title:"Life at Mars", text:"Ever wondered what life on Mars would feel like? Head over to the Mars section to find out what the living conditions of Mars are currently like through weather reports and stunning photos of the Red Planet."},
            {header:"Have a top-down look at the Natural Events as they occur!", title:"Lansat Imagery of Earth's Natural Events", text:"Using NASA's Lanstat Imagery API and it's records of Natural Disasters, we were able to create an ever-updating database of Natural Events, giving you the power to take a look."},
         ],
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      let jumboHeader = "Hubble!";
      let jumboText = "Explore the Universe";
      this.props.onChangePage(backgroundHome, jumboHome, jumboHeader, jumboText);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions(){
    this.setState({width:window.innerWidth, height:window.innerHeight});
  }

  render(){
    return(
      <Styles>
      <StyledContainer fluid>
         <StyledRow>
            <StyledCol lg={7} style={{paddingTop:"30px"}}>
               <StyledCard style={{backgroundColor:"#628fb6"}}>
                  <StyledCardHeader style={{backgroundColor:"#41688b"}}>{this.state.cardInfo[0].header}</StyledCardHeader>
                  <Card.Body>
                     <StyledCardTitle> {this.state.cardInfo[0].title} </StyledCardTitle>
                     <StyledCardText> {this.state.cardInfo[0].text} </StyledCardText>
                  </Card.Body>
               </StyledCard>
            </StyledCol>
            <StyledCol lg={5} style={{paddingTop:"30px"}}>
               <div className="imgContainer">
                  <img className="homeImage" src={MilkyWayImage} alt={"TEMPORARY"}/>
               </div>
            </StyledCol>
         </StyledRow>
         <StyledRow>
            <StyledCol lg={5}>
               <div className="imgContainer">
                  <img className="homeImage" src={DailyPicImage} alt={"TEMPORARY"}/>
               </div>
            </StyledCol>
            <StyledCol lg={7}>
               <StyledCard style={{backgroundColor:"#8f001a"}}>
                  <StyledCardHeader style={{backgroundColor:"#a9343a"}}>{this.state.cardInfo[1].header}</StyledCardHeader>
                  <Card.Body>
                     <StyledCardTitle>{this.state.cardInfo[1].title} </StyledCardTitle>
                     <StyledCardText> {this.state.cardInfo[1].text} </StyledCardText>
                     <StyledRow style={{float:"right"}} >
                        <StyledButton style={{backgroundColor:"#a9343a", borderColor:"#760015"}} variant="success"> <Link className="navStyledButton" to="/dailypic"> <h1 className="buttonText" style={{color:"#FFFFFF"}}>{"Check out Today's Picture"}</h1> </Link> </StyledButton>
                     </StyledRow>
                  </Card.Body>
               </StyledCard>
            </StyledCol>
         </StyledRow>
         <StyledRow>
            <StyledCol lg={7}>
               <StyledCard style={{backgroundColor:"#e0bf00"}}>
                  <StyledCardHeader style={{backgroundColor:"#ccae00"}}>{this.state.cardInfo[2].header}</StyledCardHeader>
                  <Card.Body>
                     <StyledCardTitle> {this.state.cardInfo[2].title} </StyledCardTitle>
                     <StyledCardText> {this.state.cardInfo[2].text} </StyledCardText>
                     <StyledRow style={{float:"right"}} >
                        <StyledButton variant="success" style={{backgroundColor:"#ccae00", borderColor:"#b39900"}}> <Link className="navStyledButton" to="/mars"> <h1 className="buttonText">{"Visit Mars"}</h1> </Link> </StyledButton>
                     </StyledRow>
                  </Card.Body>
               </StyledCard>
            </StyledCol>
            <StyledCol lg={5}>
               <div className="imgContainer">
                  <img className="homeImage" src={MarsImage} alt={"TEMPORARY"}/>
               </div>
            </StyledCol>
         </StyledRow>
         <StyledRow>
            <StyledCol lg={5} style={{paddingBottom:"70px"}}>
               <div className="imgContainer">
                  <img className="homeImage" src={NaturalEventsImage} alt={"TEMPORARY"}/>
               </div>
            </StyledCol>
            <StyledCol lg={7} style={{paddingBottom:"70px"}}>
               <StyledCard style={{backgroundColor:"#8c9110"}}>
                  <StyledCardHeader style={{backgroundColor:"#b9bf15"}}>{this.state.cardInfo[3].header}</StyledCardHeader>
                  <Card.Body>
                     <StyledCardTitle> {this.state.cardInfo[3].title} </StyledCardTitle>
                     <StyledCardText> {this.state.cardInfo[3].text} </StyledCardText>
                     <StyledRow style={{float:"right"}} >
                        <StyledButton style={{backgroundColor:"#b9bf15", borderColor:"#767a0d"}} variant="success"> <Link className="navStyledButton" to="/naturalevents"> <h1 className="buttonText">{"Explore Natural Events"}</h1> </Link> </StyledButton>
                     </StyledRow>
                  </Card.Body>
               </StyledCard>
            </StyledCol>
         </StyledRow>
      </StyledContainer>
      </Styles>
    );
  }
}
export default Home;

import React,{useCallback} from 'react';
import {Card, Button, Container, Col, Row} from 'react-bootstrap';
import {Component} from 'react';
import styled from 'styled-components';
import BackgroundMars from './assets/backgroundMars.jpg';
import Gallery from "react-photo-gallery";
import EmptyMarsImage from "./assets/brownBackground.jpg";
import Error from "./assets/ErrorMars.png";
import Curiosity from "./assets/Curiosity.jpg";
import jumboNaturalEvents from './assets/jumboMars.png';
import backgroundNaturalEvents from './assets/brownBackground.jpg';
import Loading from './assets/Loading.png';

const Styles = styled.div`
  padding:0;
  border:0;
  position:relative;

  .weatherContainer {
    background: url(${BackgroundMars}) no-repeat;
    background-size: cover;
    bottom:0px;
    margin-bottom:30px;
    min-width: 100%;
    max-width:100%;
    max-height:100%;
    min-height:100%;
  }
  .curiosityImage{
    position:relative;
    margin:auto;
    display: block;
    height: 550px;
    width: 700px;
  }
  .weatherImage {
  display: block;

  max-height:300px;
  max-width:300px;

  margin-left:auto;
  margin-right:auto;
  margin-bottom:auto;
  margin-top:15px;

  }
  .titleText {
    position: relative;
    margin:auto;
    color:#d3d3d3;
    margin-bottom:0px;
    text-align:center;
    font-size:25px;
    font-weight:450;
    text-decoration: underline;
  }
  .cardType{
    font-weight:bolder;
    text-decoration:underline;
  }
  .cardAverage{
    font-weight:1;
    font-size: 44px;
  }
  .cardCount{
    font-size: 8px;
    font-style: italic;
  }
  .marsImage{
    margin-left: 125px;
    margin-right: 125px;
  }
 .imgContainer {
   position: relative;
   margin: auto;
   margin-bottom: 25px;
   overflow: hidden;
 }
 .leftText{
    position: relative;
    text-align:right;
    margin:auto;
    font-size:45px;
    color:#A9A9A9;
 }
 .rightText{
    position: relative;
    text-align:left;
    margin:auto;
    margin-top:7px;
    font-size:40px;
    color:#A9A9A9;
    font-weight:200;
 }
`;
const StyledCol = styled(Col)`
  position:relative;
  margin:0;
`;
const StyledCard = styled(Card)`
  position:relative;
  width:${props => (((props.windowWidth/6))+"px")};
  background: rgba(0, 0, 0, 0.3);
  border-width: 0px;
  color:rgb(255,245,238);
  margin-top:10px;
  text-align:center;
  padding-bottom:px;
`;
const TitleCol = styled(Col)`
  position:relative;
  margin:0;
  text-align:center;
  margin-top:15px;
  margin-bottom:0px;
`;
const TextCol = styled(Col)`
  position:relative;
  margin:auto;
  margin-top:0px;
`;
const RoverHelpButton = styled(Button)`
   position: relative;
   margin:auto;
   margin-left:0px;
   color:#A9A9A9;
   padding:0px;
   padding-left:5px;
   padding-right:5px;
   background-color:#000000;
   font-size:10px;
   font-weight:200;
`;


class Mars extends Component{
  constructor(props){
    super(props);
    this.state = {
      width : 0,
      height : 0,
      yesterday: (new Date(((new Date()).getFullYear()),((new Date()).getMonth()),(((new Date()).getDate())-7))),

      dataWeather: "Loading Weather Data",

      cameraArray:["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
      dataCamera: ["loading Data", "loading Data", "loading Data", "loading Data", "loading Data", "loading Data", "loading Data"],
      currPhotoNum: [0,0,0,0,0,0,0],
      totalPhotoNum: [0,0,0,0,0,0,0],
      galleryImage: [[{src: Loading, width: 1, height: 1}],[{src: EmptyMarsImage, width: 1, height: 1}],[{src: EmptyMarsImage, width: 1, height: 1}],[{src: EmptyMarsImage, width: 1, height: 1}]],
      totalPhotosTaken: "Loading",
      roverHelpButtonClicked:false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    await this.updateWindowDimensions();
    await window.addEventListener('resize', this.updateWindowDimensions);
    let jumboHeader = "The Red Planet";
    let jumboText = "Find out today's weather & photos of Mars";
    await this.props.onChangePage(backgroundNaturalEvents, jumboNaturalEvents, jumboHeader, jumboText);

    let urlWeather = "https://api.nasa.gov/insight_weather/?api_key=Tk2oVQALMndvKdMKB6ToE6YIddcS3qBnedrfwVL4&feedtype=json&ver=1.0";
    let responseWeather = await fetch(urlWeather);
    this.dataWeather = await responseWeather.json();

    let leftUrlCamera = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=";
    let rightUrlCamera = "&api_key=PQ1YEa7YzQtsYTGyynEFVOQSmxdIDFCMNW8IMCRj&feedtype=json&ver=1.0";
    let formattedDate = (this.state.yesterday.getFullYear()) + "-" + (this.state.yesterday.getMonth()+1) + "-"+ (this.state.yesterday.getDate());
    formattedDate="2020-02-02"
    this.dataCamera = [];
    this.totalPhotoNum = [];
    for(let i = 0; i < 7; i++){
      let responseCamera = await fetch(leftUrlCamera + formattedDate +"&camera=" + this.state.cameraArray[i] + rightUrlCamera);
      let jsonCamera = await responseCamera.json();
      this.dataCamera[i] = await jsonCamera;
      this.totalPhotoNum[i] = await jsonCamera.photos.length;
    };

     let urlNumPhotos = "https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?&api_key=MfHQYVpalCpvawhEUdjsedukFCwE7PMa9WNNvHWk";
     let responseNumPhotos = await fetch(urlNumPhotos);
     let numPhotosJson = await responseNumPhotos.json();
     this.totalPhotosTaken = numPhotosJson.photo_manifest.total_photos;

    await this.setState({
      dataWeather : this.dataWeather,
      dataCamera : this.dataCamera,
      totalPhotoNum : this.totalPhotoNum,
      totalPhotosTaken: this.totalPhotosTaken,
    });
    this.initializePhotos();
  }

  async componentWillUnmount() {
    await window.removeEventListener('resize', this.updateWindowDimensions);
  }
  async updateWindowDimensions() {
    await this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  weatherCard(cardName){
      let uniqueReturn = [];
      let apiData = 0;
      try{
         apiData = this.state.dataWeather[this.state.dataWeather.sol_keys[0]];
         if(cardName==="Temperature"){
           uniqueReturn.push(<span className="cardAverage">{(1.8*apiData.AT.av +32).toFixed(1) + "°F"}</span>);
           uniqueReturn.push(<br  style={{marginBottom:"18px"}}/>);
           uniqueReturn.push("Min: " + (1.8*apiData.AT.mn +32).toFixed(1));
           uniqueReturn.push(<br/>);
           uniqueReturn.push("Max: " + (1.8*apiData.AT.mx +32).toFixed(1));
           uniqueReturn.push(<br style={{marginBottom:"12px"}}/>);
           uniqueReturn.push(<span className="cardCount">{"Counted " + apiData.AT.ct + " times"}</span>);
         }else if(cardName==="Wind Speed"){
           uniqueReturn.push(<span className="cardAverage">{apiData.HWS.av.toFixed(1) + " m/s"}</span>);
           uniqueReturn.push(<br  style={{marginBottom:"18px"}}/>);
           uniqueReturn.push("Min: " + apiData.HWS.mn.toFixed(1));
           uniqueReturn.push(<br/>);
           uniqueReturn.push("Max: " + apiData.HWS.mx.toFixed(1));
           uniqueReturn.push(<br style={{marginBottom:"12px"}}/>);
           uniqueReturn.push(<span className="cardCount">{"Counted " + apiData.HWS.ct + " times"}</span>);
         }else if(cardName==="Atmospheric Pressure"){
           uniqueReturn.push(<span className="cardAverage">{apiData.PRE.av.toFixed(1) + " Pa"}</span>);
           uniqueReturn.push(<br  style={{marginBottom:"18px"}}/>);
           uniqueReturn.push("Min: " + apiData.PRE.mn.toFixed(1));
           uniqueReturn.push(<br/>);
           uniqueReturn.push("Max: " + apiData.PRE.mx.toFixed(1));
           uniqueReturn.push(<br style={{marginBottom:"12px"}}/>);
           uniqueReturn.push(<span className="cardCount">{"Counted " + apiData.PRE.ct + " times"}</span>);
         }else if(cardName==="Wind Direction"){
           uniqueReturn.push(<span className="cardAverage">{apiData.WD.most_common.compass_degrees.toFixed(1) + "°"}</span>);
           uniqueReturn.push(<br  style={{marginBottom:"18px"}}/>);
           let firstDirection = this.checkDirection(apiData.WD.most_common.compass_point[0]);
           let secondDirection = this.checkDirection(apiData.WD.most_common.compass_point[1]);
           let thirdDirection = this.checkDirection(apiData.WD.most_common.compass_point[2]);
           uniqueReturn.push(firstDirection + "-" + secondDirection + thirdDirection.toLowerCase());
           uniqueReturn.push(<br/>);
           uniqueReturn.push(<br style={{marginBottom:"12px"}}/>);
           uniqueReturn.push(<span className="cardCount">{"Counted " + apiData.WD.most_common.ct + " times"}</span>);
         }else if(cardName==="Season"){
           uniqueReturn.push(<br style={{marginBottom:"18px"}}/>);
           uniqueReturn.push(<span className="cardAverage">{apiData.Season[0].toUpperCase() + apiData.Season.substring(1)}</span>);
           uniqueReturn.push(<br style={{marginBottom:"12px"}}/>);
           uniqueReturn.push(<br/>);
           uniqueReturn.push(<span className="cardCount" style={{color:"rgba(0,0,0,0)"}}>{"Counted  times"}</span>);
         }
      }
      catch(Exception){
        uniqueReturn.push(<span className="cardAverage">{(apiData==0) ? "Loading": "N/A"}</span>);
        uniqueReturn.push(<br  style={{marginBottom:"18px"}}/>);
        uniqueReturn.push("Min: " + ((apiData==0) ? "Loading": "N/A"));
        uniqueReturn.push(<br/>);
        uniqueReturn.push("Max: " + ((apiData==0) ? "Loading": "N/A"));
        uniqueReturn.push(<br style={{marginBottom:"12px"}}/>);
        uniqueReturn.push(<span className="cardCount">{"Counted: " + ((apiData==0) ? "Loading": "N/A")}</span>);
      }

      let returnedValue =
        <StyledCol><StyledCard windowWidth = {this.state.width}><Card.Body>
          <span className="cardType">
            {cardName}
          </span>
          <br/>
          {uniqueReturn}
        </Card.Body></StyledCard></StyledCol>;
      return returnedValue;
  }
  checkDirection(direction){
    if(direction.toLowerCase() === "w")
      direction = "West";
    if(direction.toLowerCase() === "n")
      direction = "North";
    if(direction.toLowerCase() === "e")
      direction = "East";
    if(direction.toLowerCase() === "s")
      direction = "South";
    return direction;
  }

   printHeaders(rowNum){
      let returnedObject = [];
      let currRowNum = 0;
      let currRowElement = 0;

      for(let i = 0; i < 7; i++){
         if(this.state.totalPhotoNum[i] != 0){
            if(currRowNum === rowNum){
               returnedObject.push(
                  <TitleCol>
                     <h1 className="titleText">{this.state.dataCamera[i].photos[this.state.currPhotoNum[i]].camera.full_name + " (" + (this.state.currPhotoNum[i]+1) + "/" + this.state.totalPhotoNum[i] + ")"}</h1>
                  </TitleCol>
               );
            }
            if(1 === currRowElement){
               currRowNum++;
               currRowElement = 0;
            }
            else
               currRowElement++;
         }
      }
      if((this.state.galleryImage[rowNum][this.state.galleryImage[rowNum].length-1] !== undefined) && (this.state.galleryImage[rowNum][this.state.galleryImage[rowNum].length-1].src === EmptyMarsImage)){
         returnedObject.push(
            <TitleCol>
               <h1 className="titleText"></h1>
            </TitleCol>
         );
      }
      return returnedObject;
   }

  handleClickPic = async (event1,object) =>{
    let offset = 0;
    let tempcurrPhotoNum = this.state.currPhotoNum;
    for(let i = 0; i < this.state.galleryImage.length; i++){
      for(let j = 0; j < this.state.galleryImage[i].length; j++){
        try{
          while(this.state.totalPhotoNum[2*i+j+offset] == 0)
            offset++;
          if(object.photo === this.state.galleryImage[i][j]){
            if(this.state.totalPhotoNum[i*2+j+offset] === (this.state.currPhotoNum[i*2+j+offset] + 1))
              tempcurrPhotoNum[i*2+j+offset] = 0;
            else
              tempcurrPhotoNum[i*2+j+offset] = this.state.currPhotoNum[i*2+j+offset]+1;
          }
        }
        catch(Exception){
        }
      }
    }
    await this.setState({currPhotoNum:tempcurrPhotoNum});
    await this.initializePhotos();
  }

  async initializePhotos(){
    try{
      let tempImage = [];
      for(let i = 0; i < 7; i++){
        if(this.state.totalPhotoNum[i] != 0)
          tempImage.push({src:this.state.dataCamera[i].photos[this.state.currPhotoNum[i]].img_src,width:1,height:1,alt:this.state.cameraArray[i]});
      }
      this.galleryImage = [[],[],[],[]];
      for(let i = 0; i < tempImage.length; i++){
        this.galleryImage[Math.floor(i/2)].push(tempImage[i]);
      }
      for(let i=0; i<this.galleryImage.length; i++){
         if(this.galleryImage[i].length == 1 )
           this.galleryImage[i].push({src:EmptyMarsImage,width:1,height:1});
      }
      await this.setState({galleryImage : this.galleryImage});
    }
    catch(Exception){
      return "Loading Mars Rover Images";
    }
  }

  render(){
    return(
      <Styles>
        <Container fluid>
           <div className="weatherContainer">
              <Row>
                  {this.weatherCard("Temperature")}
                  {this.weatherCard("Wind Speed")}
                  {this.weatherCard("Atmospheric Pressure")}
                  {this.weatherCard("Wind Direction")}
                  {this.weatherCard("Season")}
              </Row>
           </div>
           <div className="curiosityInfo">
              <Row>
                 <Col>
                    <Row>
                       <TextCol lg={5}>
                          <h1 className="leftText"> {"Name: "} </h1>
                       </TextCol>
                       <TextCol lg={7}>
                          <h1 className="rightText"> {"Curiosity"} </h1>
                       </TextCol>
                       <TextCol lg={5}>
                          <h1 className="leftText"> {"Landing Date: "} </h1>
                       </TextCol>
                       <TextCol lg={7}>
                          <h1 className="rightText"> 6<sup>th</sup> August, 2012 </h1>
                       </TextCol>
                       <TextCol lg={5}>
                          <h1 className="leftText"> {"Status: "} </h1>
                       </TextCol>
                       <TextCol lg={7}>
                          <h1 className="rightText"> {"Active"} </h1>
                       </TextCol>
                       <TextCol lg={5}>
                          <h1 className="leftText"> {"Photos Taken: "} </h1>
                       </TextCol>
                       <TextCol lg={7}>
                          <h1 className="rightText"> {this.state.totalPhotosTaken} </h1>
                       </TextCol>
                       <TextCol lg={5}>
                          <h1 className="leftText"> {"Objectives: "} </h1>
                       </TextCol>
                       <TextCol lg={7}>
                          <h1 className="rightText" style={{fontSize:"30px"}}> {"-Investigation of the Martian climate and geology"} </h1>
                          <h1 className="rightText" style={{fontSize:"30px"}}> {"-Assessment of whether Mars has ever offered environmental conditions favorable for microbial life"} </h1>
                          <h1 className="rightText" style={{fontSize:"30px"}}> {"-Planetary habitability studies in preparation for human exploration."} </h1>
                       </TextCol>
                    </Row>
                 </Col>
                 <Col>
                    <div className="imgContainer">
                        <img className="curiosityImage" src={Curiosity} alt={"TEMPORARY"}/>
                    </div>
                 </Col>
              </Row>
           </div>
           <div>
           <Row style={{ marginBottom:"50px", marginTop:"40px"}}>
              <h1 className={"leftText"}style={{marginLeft:"75px", marginRight:"0px", textAlign:"left", textDecoration:"underline"}}> {"Photos Taken by Curiosity"} </h1>
              <RoverHelpButton onClick={() => this.setState({roverHelpButtonClicked:!this.state.roverHelpButtonClicked})}> {this.state.roverHelpButtonClicked ? "Click on the images to traverse through them" : "?"} </RoverHelpButton>
           </Row>
           </div>
           <div className = "marsImage">
             <Row>
               {this.printHeaders(0)}
             </Row>
             <Gallery onClick={this.handleClickPic} margin={7} photos={(this.state.galleryImage[0].length!=0) ? this.state.galleryImage[0] : [{src: Error, width: 1, height: 1}]}/>
             <Row>
               {this.printHeaders(1)}
             </Row>
             <Gallery onClick={this.handleClickPic} margin={7} photos={this.state.galleryImage[1]}/>
             <Row>
               {this.printHeaders(2)}
             </Row>
             <Gallery onClick={this.handleClickPic} margin={7} photos={this.state.galleryImage[2]}/>
             <Row style={{marginBottom:"50px"}}>
               {this.printHeaders(3)}
             </Row>
             <Gallery onClick={this.handleClickPic} margin={7} photos={this.state.galleryImage[3]}/>
           </div>
        </Container>
      </Styles>
    );
  }
}
export default Mars;

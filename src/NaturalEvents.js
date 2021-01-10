//[LONGITUDE, LATITUDE] FOR ALL NASA STUFF
//(YYYY-MM-DD) FOR ALL NASA STUFF

import React from 'react';
import {Button, Container, Col, Row, Dropdown} from 'react-bootstrap';
import {Component} from 'react';
import styled from 'styled-components';
import Error from './assets/Error.png';
import {Typography, Slider} from '@material-ui/core';
import Loading from './assets/Loading.png';
import jumboNaturalEvents from './assets/jumboNaturalEvents.jpg';
import backgroundNaturalEvents from './assets/purpleBackground.jpg';

const Styles = styled.div`
  .imgContainer {
    position: relative;
    margin: auto;
    margin-bottom: 25px;
    overflow: hidden;
  }
  .satelliteImage {
    position:relative;
    margin:auto;
    display: block;
    height: 550px;
    width: 550px;
  }
  .dropdownButton {
    background-color:#000000;
    color:A9A9A9;
  }
  .sliderText {
    position: relative;
    margin:auto;
    color:#A9A9A9;
    text-align:center;
    font-size:24px;
  }
  .categoryTitle {
    position: relative;
    margin:auto;
    color:#A9A9A9;
    text-align:center;
    font-size:30px;
    font-weight:700;
    text-decoration: underline;
  }
  .categoryPara {
    position: relative;
    margin:auto;
    color:#A9A9A9;
    text-align:center;
    font-size:15px;
    margin-top:8px;
    font-weight:100;
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
     font-size:40px;
     color:#A9A9A9;
     font-weight:200;
  }
`;
const StyledCol = styled(Col)`
  position:relative;
  margin:auto;
`;
const StyledDropdown = styled(Dropdown)`
  position:relative;
  margin:20px;
  margin-right:0px;
`;
const StyledSlider = styled(Slider)`
  position:relative;
  margin:auto;
  margin-top:3px;
`;
const SliderCol = styled(Col)`
  position:relative;
  margin:auto;
  padding-left:10px;
`;
const TextCol = styled(Col)`
  position:relative;
  margin:auto;
  padding:3px;
`;
const TextRow = styled(Row)`
  position:relative;
  margin:auto;
  margin-top:100px;
`;
const FocusButton = styled(Button)`
   position: relative;
   text-align:right;
   margin:auto;
   color:#A9A9A9;
   padding:0px;
   padding-left:5px;
   padding-right:5px;
   background-color:#000000;
   font-size:10px;
   font-weight:200;
`;

class NaturalEvent extends Component{
  constructor(props){
    super(props);
    this.state = {
      width: 0,
      height: 0,
      closedCategoryJson:{title:"", description:"", link:"",events:[{id:"", title:"",description:"", link:"", closed:"", categories:[{id:"", title:""}], sources:[{id:"", url:""}], geometry:[{magnitudeValue:"", magnitudeUnit:"", date:"", type:"", coordinates:[0,0]}]}]},
      closedEventCounter: 0,
      closedDim: 0.15,
      closedImageUrl: Loading,
      loading:true,
      currPageNum:0,
      focusButtonClicked:false,

      closedDate:"",
      closedLongitude:"",
      closedLatitude:"",
      title:"",
      id:"ID",
      eventDescription:"",
      categoryDescription:"",
      categoryName:"",
      source:"",
      magnitudeValue:"",
      magnitudeUnit:"",
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    await this.updateWindowDimensions();
    await window.addEventListener('resize', this.updateWindowDimensions);
    let jumboHeader = "Landsat Imagery";
    let jumboText = "Have a look at various Natural Events";
    await this.props.onChangePage(backgroundNaturalEvents, jumboNaturalEvents, jumboHeader, jumboText);
    await this.updateCategory("volcanoes");
    await this.updateEvent(4);
  }
  async componentWillUnmount() {
    await window.removeEventListener('resize', this.updateWindowDimensions);
  }
  async updateWindowDimensions() {
    await this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async updateCategory(categoryName){
     await this.setState({loading:true});
    let closedImageUrl= "https://eonet.sci.gsfc.nasa.gov/api/v3/categories/" + categoryName + "?status=closed";
    let closedResponse = await fetch(closedImageUrl);
    this.closedCategoryJson = await closedResponse.json();
    this.categoryDescription = this.closedCategoryJson.description;
    this.categoryName = this.closedCategoryJson.title;
    await this.setState({
       closedCategoryJson:this.closedCategoryJson,
       categoryDescription:this.categoryDescription,
       categoryName:this.categoryName,
    });
    await this.updateEvent(0);
  }

  async updateEvent(closedEventCounter){
     await this.setState({loading:true});
     let closeI = -1;
     let closedDate = "";
     let closedLongitude = "";
     let closedLatitude = "";
     this.closedImageUrl = Error;
     if(this.state.closedCategoryJson.events.length !== 0){
        closedDate = this.state.closedCategoryJson.events[closedEventCounter].geometry[0].date.split("T")[0];
        closedLongitude = this.state.closedCategoryJson.events[closedEventCounter].geometry[0].coordinates;
        while((typeof closedLongitude[0]) == "object"){
           closedLongitude = closedLongitude[0];
        }
        closedLatitude = Number.parseFloat(closedLongitude[1]).toFixed(2).toString();
        closedLongitude = Number.parseFloat(closedLongitude[0]).toFixed(2).toString();

        this.closedImageUrl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + closedLongitude + "&lat=" + closedLatitude + "&date=" +  closedDate + "&dim=" + this.state.closedDim + "&api_key=LZsXbiDOXjh2IO9F9PxdPqQ9HCubyYhhIpEzmpqo";
        let closedResponse = await fetch(this.closedImageUrl);
        let flag = (closedResponse.ok === false);
        while(flag === true){
           closeI++;
           if(closeI%4 === 0)
             this.closedImageUrl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + (parseInt(closedLongitude) + 2*(Math.floor(closeI/4) + 1)) + "&lat=" + (closedLatitude) + "&date=" +  closedDate + "&dim=" + this.state.closedDim + "&api_key=elL4eZjJSJsCrpWiLRjfve51JzsinKLBv83TcRLS";
           else if(closeI%4 === 1)
              this.closedImageUrl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + (closedLongitude) + "&lat=" + (parseInt(closedLatitude) + 2*(Math.floor(closeI/4) + 1)) + "&date=" +  closedDate + "&dim=" + this.state.closedDim + "&api_key=hYhjvv4t46wNXLEUvBkncT1MhSIuMde3QFreFLe4";
           else if(closeI%4 === 2)
              this.closedImageUrl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + (parseInt(closedLongitude) - 2*(Math.floor(closeI/4) + 1)) + "&lat=" + (closedLatitude) + "&date=" +  closedDate + "&dim=" + this.state.closedDim + "&api_key=K5j4hZf1NgDvwSQ6gc9ZnzZHz3dcaSaE3HmUpJf7";
           else
              this.closedImageUrl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + (closedLongitude) + "&lat=" + (parseInt(closedLatitude) - 2*(Math.floor(closeI/4) + 1)) + "&date=" +  closedDate + "&dim=" + this.state.closedDim + "&api_key=igdYVlUQXL7InD5PeyxW4p73DAVCASPEKlwcaayF";

           if(closeI === 12 - 1)
             this.closedImageUrl = Error;
           closedResponse = await fetch(this.closedImageUrl);
           flag = ((closedResponse.ok === false)||(closeI === 12 - 1));
        }
     }
     this.title = this.state.closedCategoryJson.events[closedEventCounter].title;
     this.id = this.state.closedCategoryJson.events[closedEventCounter].id;
     this.source = this.state.closedCategoryJson.events[closedEventCounter].sources[0].id;
     this.eventDescription = this.state.closedCategoryJson.events[closedEventCounter].eventDescription;
     if((this.eventDescription === null) || (this.eventDescription === undefined))
        this.eventDescription = "Not Provided";
     this.magnitudeValue = this.state.closedCategoryJson.events[closedEventCounter].geometry[0].magnitudeValue;
     this.magnitudeUnit = this.state.closedCategoryJson.events[closedEventCounter].geometry[0].magnitudeUnit;
     if((this.magnitudeValue === null) || (this.magnitudeValue === undefined)){
        this.magnitudeValue = "Not Provided";
        this.magnitudeUnit = "";
     } else{
        this.magnitudeValue = Number.parseFloat(this.magnitudeUnit).toFixed(2).toString();
     }

     await this.setState({
         closedImageUrl : this.closedImageUrl,
         closedEventCounter: closedEventCounter,
         closedDim: 0.15,
         loading: false,
         currPageNum: 0,
         focusButtonClicked:false,

         closedDate:closedDate,
         closedLongitude:closedLongitude,
         closedLatitude:closedLatitude,
         title:this.title,
         id:this.id,
         eventDescription:this.eventDescription,
         source:this.source,
         magnitudeValue:this.magnitudeValue,
         magnitudeUnit:this.magnitudeUnit,
     });
  }

  async updateDim(value){
     await this.setState({loading:true});
     let leftUrl = this.state.closedImageUrl.split("&dim=");
     let rightUrl = leftUrl[1].split("&api_key=");
     this.closedImageUrl = leftUrl[0] + "&dim=" + value + "&api_key=" + rightUrl[1];
     await this.setState({
         closedImageUrl : this.closedImageUrl,
         loading : false,
     });
 }

  printDropdownEvents(){
     let returnedObject = [];
     let loopNum = 11;
     this.currPageNum = this.state.currPageNum;
     if(loopNum > (this.state.closedCategoryJson.events.length - loopNum*this.currPageNum))
       loopNum = (this.state.closedCategoryJson.events.length - loopNum*this.currPageNum);
     if(this.currPageNum !== 0)
       returnedObject.push(<Dropdown.Item onClick={async () => await this.setState({currPageNum:this.currPageNum-1})}>{"[<--] Prev Page"}</Dropdown.Item>);
     for(let i=0; i<loopNum; i++)
        returnedObject.push(<Dropdown.Item onClick={() => this.updateEvent(i+11*this.currPageNum)}>{this.state.closedCategoryJson.events[i+11*this.currPageNum].title}</Dropdown.Item>);
     if(this.state.closedCategoryJson.events.length > 11*(this.currPageNum+1))
        returnedObject.push(<Dropdown.Item onClick={async () => await this.setState({currPageNum:this.currPageNum+1})}>{"[-->] Next Page"}</Dropdown.Item>);
     return returnedObject;
  }

  printDropdownCategories(){
     let returnedObject = [
        <Dropdown.Item onClick={() => this.updateCategory("volcanoes")}>Volcanoes</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("drought")}>Drought</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("dustHaze")}>Dust and Haze</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("earthquakes")}>Earthquakes</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("floods")}>Floods</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("landslides")}>Landslides</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("manmade")}>Man-made</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("seaLakeIce")}>Sea and Lake Ice</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("severeStorms")}>Severe Storms</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("snow")}>Snow</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("tempExtremes")}>Temperature Extremes</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("waterColor")}>Water Color</Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("wildfires")}>Wildfires</Dropdown.Item>
     ];
     return returnedObject;
 }

  render(){
    return(
      <Styles widthOfPage = {this.state.width}>
      <Container fluid >
         <Row>
            <StyledCol lg={2}>
               <StyledDropdown>
                 <Dropdown.Toggle className="dropdownButton" id="dropdown-basic" disabled={this.state.loading}>
                   Categories
                 </Dropdown.Toggle>
                 <Dropdown.Menu>
                     {this.printDropdownCategories()}
                 </Dropdown.Menu>
               </StyledDropdown>
               <StyledDropdown>
                 <Dropdown.Toggle className="dropdownButton" id="dropdown-basic" disabled={this.state.loading}>
                   Events
                 </Dropdown.Toggle>
                 <Dropdown.Menu>
                     {this.printDropdownEvents()}
                 </Dropdown.Menu>
               </StyledDropdown>
            </StyledCol>
            <SliderCol lg={4}>
               <Row>
                  <TextCol>
                     <h1 className={"leftText"}> {"Focus"} </h1>
                  </TextCol>
                  <TextCol style={{marginTop:"0px"}}>
                     <FocusButton onClick={() => this.setState({focusButtonClicked:!this.state.focusButtonClicked})}> {this.state.focusButtonClicked ? "Use this slider if only a fraction of the image is visible.\n(Default value: 0.15)" : "?"} </FocusButton>
                  </TextCol>
               </Row>
               <Row>
                  <StyledSlider
                     disabled={this.state.loading}
                     defaultValue={this.state.closedDim}
                     aria-labelledby="discrete-slider-small-steps"
                     step={0.05}
                     onChangeCommitted={(e,val) => this.updateDim(val)}
                     marks
                     min={0.05}
                     max={0.75}
                     valueLabelDisplay="auto"
                  />
               </Row>
            </SliderCol>
            <StyledCol lg={6}>
               <Row>
                  <h1 className="categoryTitle"> {this.state.categoryName} </h1>
               </Row>
               <Row>
                  <h1 className="categoryPara"> {this.state.categoryDescription} </h1>
               </Row>
            </StyledCol>
         </Row>
         <Row>
            <Col>
               <TextRow>
                  <TextCol lg={5}>
                     <h1 className="leftText"> {this.state.id + ": "} </h1>
                  </TextCol>
                  <TextCol lg={7}>
                     <h1 className="rightText"> {this.state.title} </h1>
                  </TextCol>
               </TextRow>
               <Row>
                  <TextCol lg={5}>
                     <h1 className="leftText"> {"Description: "} </h1>
                  </TextCol>
                  <TextCol lg={7}>
                     <h1 className="rightText"> {this.state.eventDescription} </h1>
                  </TextCol>
               </Row>
               <Row>
                  <TextCol lg={5}>
                     <h1 className="leftText"> {"Source: "} </h1>
                  </TextCol>
                  <TextCol lg={7}>
                     <h1 className="rightText"> {this.state.source} </h1>
                  </TextCol>
               </Row>
               <Row>
                  <TextCol lg={5}>
                     <h1 className="leftText"> {"Magnitude: "} </h1>
                  </TextCol>
                  <TextCol lg={7}>
                     <h1 className="rightText"> {this.state.magnitudeValue + " " + this.state.magnitudeUnit} </h1>
                  </TextCol>
               </Row>
               <Row>
                  <TextCol lg={5}>
                     <h1 className="leftText"> {"Coordinates: "} </h1>
                  </TextCol>
                  <TextCol lg={7}>
                     <h1 className="rightText"> {"[" + this.state.closedLatitude + ", " + this.state.closedLongitude + "]"} </h1>
                  </TextCol>
               </Row>
               <Row>
                  <TextCol lg={5}>
                     <h1 className="leftText"> {"Date: "} </h1>
                  </TextCol>
                  <TextCol lg={7}>
                     <h1 className="rightText"> {this.state.closedDate} </h1>
                  </TextCol>
               </Row>
            </Col>
            <Col>
               <div className="imgContainer">
                   <img src={this.state.loading ? Loading : this.state.closedImageUrl } alt={"TEMPORARY"} className="satelliteImage"/>
                   <h1 className="categoryPara" style={{fontSize:"11px",color:"#B90E0A", fontWeight:600}}> {"Due to slow API, please give the website 10-15 seconds for the picture to load."} </h1>
               </div>
            </Col>
         </Row>
      </Container>
      </Styles>
    );
  }
}
export default NaturalEvent;

//[LONGITUDE, LATITUDE] FOR ALL NASA STUFF
//(YYYY-MM-DD) FOR ALL NASA STUFF

import React from 'react';
import {Button, Container, Col, Row, Dropdown} from 'react-bootstrap';
import {Component} from 'react';
import styled from 'styled-components';
import Error from './assets/Error.png';
import {Slider} from '@material-ui/core';
import Loading from './assets/Loading.png';
import jumboNaturalEvents from './assets/jumboNaturalEvents.jpg';
import backgroundNaturalEvents from './assets/purpleBackground.jpg';
import ParaBackground from './assets/naturalEventsParaBackground.png';
import Particles from "react-particles-js";

const Styles = styled.div`
  .satelliteImage {
    position: relative;
    margin: auto;
    height: 550px;
  display: block;
  }
  .backgroundContainer{
    width:100%;
    height: 100%;
    background: rgb(20, 11, 40);
    position: absolute;
  }
  .sliderText {
    position: relative;
    margin:auto;
    color:#A9A9A9;
    text-align:center;
    font-size:24px;
  }
  .dropdownButtons{
       position: relative;
       margin:auto;
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
    .dropdownItems{
         position: relative;
         margin:auto;
         background-color:rgb(54, 149, 255);
         outline:none;
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
     font-size:40px;
     font-weight:400;
     color:#A9A9A9;
  }
  .rightText{
     position: relative;
     text-align:left;
     margin:auto;
     font-size:35px;
     color:#A9A9A9;
     font-weight:200;
  }
  .titleParatext{
     position: relative;
     margin:auto;
     color:#e9e9e9;
     font-size:20px;
     font-weight:400;
     text-align: center;
     background:url(${ParaBackground});
     background-size:cover;
     padding:20px;
     margin:20px;
     margin-top:30px;
     border-radius: 15px;
     border: 7px solid rgba(255, 230, 234,0.06);
  }
  .infoContainer {
       position: relative;
       margin: auto;
       overflow: hidden;
       background-color:rgba(255, 255, 255,0.03);
       padding:10px;
       background-size:cover;
       border: 15px solid rgba(255, 230, 234,0.06);
       border-left: 7px solid rgba(255, 230, 234,0.06);
       border-right: 7px solid rgba(255, 230, 234,0.06);
       background-size:cover;
       border-radius:50px;
  }
`;
const StyledCol = styled(Col)`
  position:relative;
  margin:auto;
`;
const StyledRow = styled(Row)`
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
  margin-right:40px;
`;
const SliderCol = styled(Col)`
  position:relative;
  margin:auto;
  padding-left:10px;
`;
const FocusButton = styled(Button)`
   position: relative;
   margin:auto;
   color:#A9A9A9;
   padding:0px;
   padding-left:5px;
   padding-right:5px;
   background-color:#000000;
   font-size:10px;
   font-weight:200;
   transition:all 0.2s ease;
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
      id:"Loading Event",
      eventDescription:"",
      categoryDescription:"",
      categoryName:"Loading Category",
      source:"",
      magnitudeValue:"",
      magnitudeUnit:"",
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    await window.scrollTo(0, 0);
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
    await this.setState({
      loading:true,
      categoryDescription:"Loading Category",
      categoryName:"",
    });
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
     await this.setState({
        loading:true,
        title:"",
        id:"Loading Event",
        source:"",
        eventDescription:"",
        magnitudeValue:"",
        magnitudeUnit:"",
        closedDate:"",
        closedLongitude:"",
        closedLatitude:"",
     });
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
       returnedObject.push(<Dropdown.Item onClick={async () => await this.setState({currPageNum:this.currPageNum-1})}> <span style={{color:"#9b007c", fontWeight:"650"}}>{"[<--] Prev Page (" + (this.state.currPageNum) + "/" + (Math.ceil(this.state.closedCategoryJson.events.length/11)) + ")"}</span> </Dropdown.Item>);
     for(let i=0; i<loopNum; i++)
        returnedObject.push(<Dropdown.Item onClick={() => this.updateEvent(i+11*this.currPageNum)}> <span style={{color:"#9b007c", fontWeight:"450"}}>{this.state.closedCategoryJson.events[i+11*this.currPageNum].title}</span> </Dropdown.Item>);
     if(this.state.closedCategoryJson.events.length > 11*(this.currPageNum+1))
        returnedObject.push(<Dropdown.Item onClick={async () => await this.setState({currPageNum:this.currPageNum+1})}> <span style={{color:"#9b007c", fontWeight:"650"}}>{"[-->] Next Page (" + (this.state.currPageNum+2) + "/" + (Math.ceil(this.state.closedCategoryJson.events.length/11)) + ")"}</span> </Dropdown.Item>);
     return returnedObject;
  }

  printDropdownCategories(){
     let returnedObject = [
        <Dropdown.Item onClick={() => this.updateCategory("volcanoes")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Volcanoes</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("drought")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Drought</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("dustHaze")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Dust and Haze</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("earthquakes")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Earthquakes</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("floods")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Floods</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("landslides")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Landslides</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("manmade")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Man-made</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("seaLakeIce")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Sea and Lake Ice</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("severeStorms")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Severe Storms</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("snow")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Snow</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("tempExtremes")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Temperature Extremes</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("waterColor")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Water Color</span> </Dropdown.Item>,
        <Dropdown.Item onClick={() => this.updateCategory("wildfires")}> <span style={{color:"#9b007c", fontWeight:"650"}}>Wildfires</span> </Dropdown.Item>,
     ];
     return returnedObject;
 }

  render(){
    return(
      <Styles widthOfPage = {this.state.width} style={{position:"relative", margin:"auto", paddingBottom: "18px"}} fluid>
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
        <StyledCol xl={2} lg={1} md={1} sm={0} xs={0}></StyledCol>
        <StyledCol xl={9} lg={10} md={10} sm={12} xs={12}>
            <StyledRow>
               <h1 className="titleParatext">
                  Utilizing NASA's Landsat Imagery API and Natural Event Tracker API, we were able to devise a program which allows you to pick from a variety of unique Natural Events. Some images might not appear as satisfying but thats where the Focus Slider comes to play as it might help battle clouds and create a clearer picture. If the image isn't adequate, do not worry as there are over a hundred images to choose from!
               </h1>
            </StyledRow>
            <StyledRow>
               <StyledCol lg={2} style={{paddingLeft:"0px"}}>
                  <StyledDropdown style={{marginLeft:"0px"}}>
                    <Dropdown.Toggle className="dropdownButtons" id="dropdown-basic" disabled={this.state.loading}>
                      {this.state.loading ? "Loading" : "Categories"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdownItems">
                        {this.printDropdownCategories()}
                    </Dropdown.Menu>
                  </StyledDropdown>
                  <StyledDropdown style={{marginLeft:"0px"}}>
                    <Dropdown.Toggle className="dropdownButtons" id="dropdown-basic" disabled={this.state.loading}>
                      {this.state.loading ? "Loading" : "Events"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdownItems">
                        {this.printDropdownEvents()}
                    </Dropdown.Menu>
                  </StyledDropdown>
               </StyledCol>
               <SliderCol lg={4}>
                  <StyledRow lg={7}>
                     <StyledCol style={{paddingRight:"0px"}}>
                        <h1 className={"leftText"}> {this.state.loading ? "Loading" : "Focus"} </h1>
                     </StyledCol>
                     <StyledCol style={{marginTop:"0px", paddingLeft:"0px"}} lg={5}>
                        <FocusButton onMouseOver={() => this.setState({focusButtonClicked:true})} onMouseOut={() => this.setState({focusButtonClicked:false})}> {this.state.focusButtonClicked ? "Use this slider if only a fraction of the image is visible.\n(Default value: 0.15)" : "?"} </FocusButton>
                     </StyledCol>
                  </StyledRow>
                  <StyledRow>
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
                  </StyledRow>
               </SliderCol>
               <StyledCol lg={6}>
                  <StyledRow>
                     <h1 className="categoryTitle"> {this.state.categoryName} </h1>
                  </StyledRow>
                  <StyledRow>
                     <h1 className="categoryPara"> {this.state.categoryDescription} </h1>
                  </StyledRow>
               </StyledCol>
            </StyledRow>
            <StyledRow>
               <StyledCol style={{padding:"0px"}}>
                  <div className="infoContainer">
                     <StyledRow>
                        <StyledCol lg={6}>
                           <h1 className="leftText"> {this.state.id + ": "} </h1>
                        </StyledCol>
                        <StyledCol lg={6}>
                           <h1 className="rightText"> {this.state.title} </h1>
                        </StyledCol>
                     </StyledRow>
                     <StyledRow>
                        <StyledCol lg={6}>
                           <h1 className="leftText"> {"Description: "} </h1>
                        </StyledCol>
                        <StyledCol lg={6}>
                           <h1 className="rightText"> {this.state.eventDescription} </h1>
                        </StyledCol>
                     </StyledRow>
                     <StyledRow>
                        <StyledCol lg={6}>
                           <h1 className="leftText"> {"Source: "} </h1>
                        </StyledCol>
                        <StyledCol lg={6}>
                           <h1 className="rightText"> {this.state.source} </h1>
                        </StyledCol>
                     </StyledRow>
                     <StyledRow>
                        <StyledCol lg={6}>
                           <h1 className="leftText"> {"Magnitude: "} </h1>
                        </StyledCol>
                        <StyledCol lg={6}>
                           <h1 className="rightText"> {this.state.magnitudeValue + " " + this.state.magnitudeUnit} </h1>
                        </StyledCol>
                     </StyledRow>
                     <StyledRow>
                        <StyledCol lg={6}>
                           <h1 className="leftText"> {"Coordinates: "} </h1>
                        </StyledCol>
                        <StyledCol lg={6}>
                           <h1 className="rightText"> {"[" + this.state.closedLatitude + ", " + this.state.closedLongitude + "]"} </h1>
                        </StyledCol>
                     </StyledRow>
                     <StyledRow>
                        <StyledCol lg={6}>
                           <h1 className="leftText"> {"Date: "} </h1>
                        </StyledCol>
                        <StyledCol lg={6}>
                           <h1 className="rightText"> {this.state.closedDate} </h1>
                        </StyledCol>
                     </StyledRow>
                  </div>
               </StyledCol>
               <StyledCol>
                   <img src={this.state.loading ? Loading : this.state.closedImageUrl } alt={"TEMPORARY"} className="satelliteImage"/>
                   <h1 className="categoryPara" style={{fontSize:"11px",color:"#B90E0A", fontWeight:600}}> {"Due to slow API, please give the website 10-15 seconds for the picture to load."} </h1>
               </StyledCol>
            </StyledRow>
         </StyledCol>
         <StyledCol xl={2} lg={1} md={1} sm={0} xs={0}></StyledCol>
      </Styles>
    );
  }
}
export default NaturalEvent;

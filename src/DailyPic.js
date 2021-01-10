import React from 'react';
import {Button, Container, Col, Row} from 'react-bootstrap';
import {Component} from 'react';
import styled from 'styled-components';
import jumboDailyPic from './assets/jumboDaily.jpg';
import backgroundDailyPic from './assets/greenBackground.jpg';

const Styles = styled.div`
  .imgContainer {
    position: relative;
    margin: auto;
    margin-bottom: 15px;
    overflow: hidden;
  }
  .paragraphText {
    position:relative;
    margin:auto;
    color:#d3d3d3;
    text-align:justify;
    font-size:14px;
    max-width:75%;
    margin-bottom: 20px;
  }
  .buttonText {
    position:relative;
    margin:auto;
    padding-bottom:10px;
    top:50%;
    font-size:${props => (((props.widthOfPage/30))+"px")};
  }
  .titleText {
    position:relative;
    margin:auto;
    margin-bottom:10px;
    color:#FFFFFF;
    text-align:center;
    font-size:35px;
  }
  .spaceImage {
    position:relative;
    margin:auto;
    width:100%;
    display: block;
    min-height: ${props => (((props.widthOfPage/3.3))+"px")};
    max-height: ${props => (((props.widthOfPage/2.5))+"px")};
  }
`;
const LeftButton = styled(Button)`
   position: absolute;
   margin:auto;
   padding-top:0px;
   padding-bottom:0px;
   right: 0px;
`;
const RightButton = styled(Button)`
  position:absolute;
  padding-top:0px;
  padding-bottom:0px;
  margin:auto;
  left:0px;
`;
const StyledCol = styled(Col)`
  position:relative;
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
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
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
    this.setState({
      backgroundEarth : this.backgroundEarth,
    });
  }
  handleClickLeft = async () =>{
    await this.refreshBackgroundEarth();
    this.setState({
      pageDate: (new Date(this.state.pageDate.getFullYear(),this.state.pageDate.getMonth(),this.state.pageDate.getDate()-1))
    });
    await this.refreshBackgroundEarth();
  }
  handleClickRight = async () => {
    await this.refreshBackgroundEarth();
    this.setState({
      pageDate: (new Date(this.state.pageDate.getFullYear(),this.state.pageDate.getMonth(),this.state.pageDate.getDate()+1))
    });
    await this.refreshBackgroundEarth();
  }
  checkDate(){
    let checkDate = new Date();
    checkDate = (new Date(((new Date()).getFullYear()),((new Date()).getMonth()),(((new Date()).getDate())-1)));
    return ((this.state.pageDate.getDate() === checkDate.getDate()) && (this.state.pageDate.getYear() === checkDate.getYear()) && this.state.pageDate.getMonth() === checkDate.getMonth())
  }
  returnNextDay(pageDate){
     return (new Date(pageDate.getFullYear(), pageDate.getMonth(), pageDate.getDate()+1))
 }

  render(){
    return(
      <Styles widthOfPage = {this.state.width}>
        <Container fluid >
          <Row>
            <h1 className="titleText">{this.state.backgroundEarth.title + " (" + (this.returnNextDay(this.state.pageDate).getDate()) + "/" + (this.returnNextDay(this.state.pageDate).getMonth()+1) + "/"+ (this.returnNextDay(this.state.pageDate).getFullYear()) + ")"}</h1>
          </Row>
          <Row>
            <StyledCol xl={2} lg={2} md={1} sm={0}>
              <LeftButton onClick={this.handleClickLeft} variant="success">
                <h1 className="buttonText">{"<"}</h1>
              </LeftButton>
            </StyledCol>
            <StyledCol xl={8} lg={8} md={10} sm={12}>
              <div className="imgContainer">
                 { (this.state.backgroundEarth.media_type==="image") ? (<img src={this.state.backgroundEarth.url} alt={this.state.backgroundEarth.title} className="spaceImage"/>) : (<iframe alt={this.state.backgroundEarth.title} className="spaceImage" src={this.state.backgroundEarth.url}></iframe>)}
              </div>
            </StyledCol>
            <StyledCol xl={2} lg={2} md={1} sm={0}>
              <RightButton onClick={this.handleClickRight} variant="success" disabled={this.checkDate()}>
                <h1 className="buttonText">{">"}</h1>
              </RightButton>
            </StyledCol>
          </Row>
          <Row>
            <p className="paragraphText">{this.state.backgroundEarth.explanation}</p>
          </Row>
        </Container>
      </Styles>
    );
  }
}
export default DailyPic;

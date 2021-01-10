import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import Mars from './Mars';
import DailyPic from './DailyPic';
import NoMatch from './NoMatch';
import NaturalEvents from './NaturalEvents';

import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import Jumbotron from './components/Jumbotron';

import homeBackground from './assets/blackBackground.jpg';
import jumboBackground from './assets/jumboHome.jpg';

const Styles = styled.div`
  .websiteBackground{
    background: url(${props => (props.backgroundColor)}) center;
  }
`;

class App extends Component {
   constructor(props){
      super(props);
      this.state = {
         bgColor:homeBackground,
         jumboColor:jumboBackground,
         jumboHeader:"jumboHeader",
         jumboText:"jumboText",
      };
   }


   handlePageChange = (bgColor, jumboColor, jumboHeader, jumboText) => {
     this.setState({bgColor:bgColor, jumboColor:jumboColor, jumboHeader:jumboHeader, jumboText:jumboText});
   }

  render() {
    return (
      <Styles backgroundColor = {this.state.bgColor}>
      <Router>
        <NavigationBar onChangePage={this.handlePageChange}/>
        <Jumbotron jumboColor={this.state.jumboColor} jumboHeader={this.state.jumboHeader} jumboText={this.state.jumboText}/>
        <div className="websiteBackground">
            <Switch>
             <Route exact path="/hubble" render={(props) => (<Home {...props} onChangePage={this.handlePageChange} />)}/>
             <Route path="/hubble/dailypic" render={(props) => (<DailyPic {...props} onChangePage={this.handlePageChange} />)}/>
             <Route path="/hubble/mars" render={(props) => (<Mars {...props} onChangePage={this.handlePageChange} />)}/>
             <Route path="/hubble/naturalevents" render={(props) => (<NaturalEvents {...props} onChangePage={this.handlePageChange} />)}/>
             <Route component={NoMatch}/>
            </Switch>
        </div>
      </Router>
      </Styles>
    );
  }
}

export default App;

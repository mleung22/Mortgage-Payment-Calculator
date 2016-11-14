import React, {Component} from 'react';
import CalculatorForm from './components/calculatorForm';
import PiChart from './components/piChart';
import AmortizationSchedule from './components/amortizationScheduleTable';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Nav from './components/topNavBar';


class App extends Component {

  constructor() {
    super();
    this.state = {
      mortgageData: {},
    };
  }

  updateMortgageData(data){
    this.setState({mortgageData: data});
  }

  clearMortgageData(){
    this.setState({mortgageData: {}});
  }

  render(){
    return (
      <div>
        <Nav />
        <Row>&nbsp;</Row>
        <Col xs={12}>
          <Col xs={6}>
            <Row><CalculatorForm clearMortgageData={this.clearMortgageData.bind(this)} updateMortgageData={this.updateMortgageData.bind(this)}/></Row>
            <Row><PiChart mortgageData={this.state.mortgageData}/></Row>
          </Col>
          <Col xs={6}><AmortizationSchedule mortgageData={this.state.mortgageData}/></Col>
        </Col>
      </div>
    );
  }
}

export default App;

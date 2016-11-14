import React, {Component} from 'react';
import { Panel } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import Request from 'superagent';

class CalculatorForm extends Component {
  constructor() {
    super();
    this.state = {
      propertyValue: '200000',
      downPayment: '100000' ,
      downPaymentPercent: '50',
      loanDuration: '30' ,
      interestRate: '' ,
      propertyTax: '2400' ,
      propertyTaxPercent: '1.2',
      privateMortgage: '1000' ,
      mortgageData: '' ,
    };
  }

  componentWillMount(){
    this.getCurrentInterestRate();
  }

  componentDidMount(){
    this.handleCalculate();
  }

  getCurrentInterestRate(){
    var zws_id = 'X1-ZWz1fix06ldngr_8z2s9';
    Request.get('http://localhost:1337/www.zillow.com/webservice/GetRateSummary.htm?' +
                  'zws-id='         + zws_id +
                  '&output=json')
    .then((res) => {
      var todaysInterestRate = JSON.parse(res.text).response.today.thirtyYearFixed;
      this.setState({interestRate: todaysInterestRate});
    });
  }

  handleCalculate(){
    var zws_id = 'X1-ZWz1fix06ldngr_8z2s9';
    var loanDurationInYears = this.state.loanDuration !== '' ? this.state.loanDuration * 12 : '';
    var downPaymentPercent = this.state.downPaymentPercent;
    var madisonWIZip = '53705';
    Request.get('http://localhost:1337/www.zillow.com/webservice/mortgage/CalculateMonthlyPaymentsAdvanced.htm?' +
                  'zws-id='         + zws_id +
                  '&price='         + this.state.propertyValue +
                  '&down='          + this.state.downPaymentPercent +
                  '&rate='          + this.state.interestRate +
                  '&propertytax='   + this.state.propertyTax +
                  '&pmi='           + this.state.privateMortgage +
                  '&terminmonths='  + loanDurationInYears +
                  '&zip='           + madisonWIZip +
                  '&schedule=monthly' +
                  '&output=json')
    .then((res) => {
      var data = JSON.parse(res.text).response;
      this.props.updateMortgageData(data);
    });

  }

  handlePropertyValueChange(e){
    this.setState({propertyValue: e.target.value});
  }

  handlePropertyValueKeyUp(e){

    this.clearDownPayment();
    if(e.keyCode === 13){
      this.handleCalculate();
    }
  }

  handleDownPaymentChange(e){
    if(this.state.propertyValue){
      var base = e.target.value;
      var percent = Math.round((e.target.value / this.state.propertyValue) * 100);

      this.setState({
        downPayment: base,
        downPaymentPercent: percent
      });
    }
    else {
      this.setState({
        downPayment: 0,
        downPaymentPercent: 0
      });
    }

  }

  handleDownPaymentPercentChange(e){
    var percent = Math.round(e.target.value);
    var base = (e.target.value / 100) * this.state.propertyValue;
    this.setState({
      downPayment: base,
      downPaymentPercent: percent
    });
  }


  handleLoanDurationChange(e){
    this.setState({loanDuration: e.target.value});
  }

  handleInterestRateChange(e){
    var interestRate = e.target.value;
    interestRate.replace('.', '&period;');
    this.setState({interestRate: interestRate});
  }

  handlePropertyTaxChange(e){
    if(this.state.propertyValue){
      var base = e.target.value;
      var percent = (e.target.value / this.state.propertyValue) * 100;

      this.setState({
        propertyTax: base,
        propertyTaxPercent: percent
      });
    }
    else {
      this.setState({
        propertyTax: 0,
        propertyTaxPercent: 0
      });
    }
  }

  handlePropertyPercentTaxChange(e){
    var percent = e.target.value;
    var base = (e.target.value / 100) * this.state.propertyValue;
    this.setState({
      propertyTax: base,
      propertyTaxPercent: percent
    });
  }

  handlePrivateMortgageChange(e){
    this.setState({privateMortgage: e.target.value});
  }

  clearDownPayment(){
    this.setState({
      downPayment: '',
      downPaymentPercent: ''
    });
  }

  resetFields(){
    this.setState({
      propertyValue: '',
      downPayment: '' ,
      downPaymentPercent: '' ,
      loanDuration: '' ,
      propertyTax: '' ,
      propertyTaxPercent: '',
      privateMortgage: '' ,
    });
    this.props.clearMortgageData();
    this.getCurrentInterestRate();
  }

  render(){
    return (
      <Grid>
        <Col xs={8} md={6}>
          <Panel>

            <Row>
              <Col xs={6}><ControlLabel bsClass='input-sm'>Property Value:</ControlLabel></Col>
              <Col xs={6}><FormControl type='text' ref='propertyValue' value={this.state.propertyValue} onKeyUp={this.handlePropertyValueKeyUp.bind(this)} onChange={this.handlePropertyValueChange.bind(this)}/></Col>
            </Row>

            <Row>
              <Col xs={6}><ControlLabel bsClass='input-sm'>Down Payment:</ControlLabel></Col>
              <Col xs={6} className='no-padding-horizontal'>
                <Col xs={8}><FormControl type='text' value={this.state.downPayment} onChange={this.handleDownPaymentChange.bind(this)}/></Col>
                <Col xs={4}><FormControl type='text' placeholder='%' value={this.state.downPaymentPercent} onChange={this.handleDownPaymentPercentChange.bind(this)}/></Col>
              </Col>
            </Row>

            <Row>
              <Col xs={6}><ControlLabel bsClass='input-sm'>Loan Duration (by year):</ControlLabel></Col>
              <Col xs={6}><FormControl type='text' value={this.state.loanDuration} onChange={this.handleLoanDurationChange.bind(this)}/></Col>
            </Row>

            <Row>
              <Col xs={6}><ControlLabel bsClass='input-sm'>Interest Rate:</ControlLabel></Col>
              <Col xs={6}><FormControl type='text' value={this.state.interestRate} onChange={this.handleInterestRateChange.bind(this)}/></Col>
            </Row>

            <Row>
              <Col xs={6}><ControlLabel bsClass='input-sm'>Annual Property Tax:</ControlLabel></Col>
              <Col xs={6} className='no-padding-horizontal'>
                <Col xs={8}><FormControl type='text' value={this.state.propertyTax} onChange={this.handlePropertyTaxChange.bind(this)}/></Col>
                <Col xs={4}><FormControl type='text' placeholder='%' value={this.state.propertyTaxPercent} onChange={this.handlePropertyPercentTaxChange.bind(this)}/></Col>
              </Col>
            </Row>

            <Row>
              <Col xs={6}><ControlLabel bsClass='input-sm'>Private Mortage Insurance:</ControlLabel></Col>
              <Col xs={6}><FormControl type='text' value={this.state.privateMortgage} onChange={this.handlePrivateMortgageChange.bind(this)}/></Col>
            </Row>

            <Row>
              <Col xs={3} xsOffset={6}><Button bsSize='sm' bsStyle='warning' block onClick={this.resetFields.bind(this)}>Clear</Button></Col>
              <Col xs={3}><Button bsSize='sm' bsStyle='success' block disabled={!this.state.propertyValue} onClick={this.handleCalculate.bind(this)}>Calculate</Button></Col>
            </Row>

          </Panel>
        </Col>
      </Grid>
    );
  }
}

export default CalculatorForm;

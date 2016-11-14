import React, {Component} from 'react';
import { Panel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
class AmortizationSchedule extends Component {

  render(){

    if(JSON.stringify(this.props.mortgageData) !== '{}'){

      return (
        <Col xs={12}>
          <Panel className='center-text'>
            <div className='enable-scroll' style={{height: window.innerHeight - 500}}>
                <label>Amortization Schedule</label>
                <Table striped bordered condensed hover responsive>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Principal</th>
                      <th>Interest</th>
                      <th>Principal Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.mortgageData.monthlyAmortizationSchedule.map(function(row, i){
                      return (
                        <tr key={i}>
                          <td>{++i}</td>
                          <td>{row.principal}</td>
                          <td>{row.interest}</td>
                          <td>{row.endingBalance}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
            </div>
          </Panel>
        </Col>
      );

    }
    else {

      return (
        <Col xs={12}>
          <Panel className='center-text'>
            <label>Amortization Schedule</label>
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Principal Remaining</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan='4'>No data available in table</td>
                </tr>
              </tbody>
            </Table>
          </Panel>
        </Col>
      );

    }

  }
}

export default AmortizationSchedule;

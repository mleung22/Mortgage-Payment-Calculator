import React, {Component} from 'react';
import { Panel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import {Doughnut} from 'react-chartjs-2';
class PiChart extends Component {

  getGraphData(principalInterest, propertyTax, pmi){
    var data = {

      labels: [
          "Principal & Interest",
          "Property Tax",
          "Private Mortgage Insurance"
      ],
      datasets: [
          {
              data: [
                principalInterest,
                propertyTax,
                pmi
              ],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }
      ],
    };

    return data;

  }
  render(){

    var isMortgageDataEmpty = JSON.stringify(this.props.mortgageData) === '{}';

    var principalInterest = !isMortgageDataEmpty ? this.props.mortgageData.monthlyPrincipalAndInterest : 0,
        propertyTax       = !isMortgageDataEmpty ? this.props.mortgageData.monthlyPropertyTaxes : 0,
        pmi               = !isMortgageDataEmpty ? this.props.mortgageData.monthlyPmi : 0;

    return (
      <Grid>
        <Col xs={8}>
          <Panel>
            <Doughnut data={this.getGraphData(principalInterest, propertyTax, pmi)} />
          </Panel>
        </Col>
      </Grid>
    );
  }
}

export default PiChart;

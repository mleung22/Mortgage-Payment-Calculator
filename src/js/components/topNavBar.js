import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';
class TopNavBar extends Component {

  render(){
    return (
      <Navbar fluid inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Mortgage Payment Calculator</a>
            </Navbar.Brand>
          </Navbar.Header>
      </Navbar>
    );
  }

}
export default TopNavBar;

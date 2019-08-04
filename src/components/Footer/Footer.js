import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {
      year: ''
    }
  }
  componentDidMount(){
    let date = new Date();
    let year = date.getFullYear(); 
    this.setState({
      year: year
    })
  }
  render(){
    return( <footer>
      <p className="center-footer">Fitness Meets Wellness &copy; {this.state.year} </p>
    </footer>);
  }
} 

export default Footer;

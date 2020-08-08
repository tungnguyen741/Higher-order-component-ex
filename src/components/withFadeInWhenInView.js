import React from 'react';
import { Component } from 'react';

const withFadeInWhenInView = (WrappedComponent, onWheelDown) => {  
  return class extends Component {
    constructor(){
      super();
      
      this.state={
        scrollTop: 0
      }
     
    }
    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll)
    }
    
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    }
     handleScroll = (e) => {
  
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  
      const height =document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const scrolled = winScroll / height;
      console.log(scrolled);
        this.setState({
          scrollTop: scrolled,
        })

    }
    render(){
      return (
        <div 
        ref={this.myRef}
        onScroll={this.handleScroll}
        style={{
          position: "relative",
          left:  this.state.scrollTop===1 ? "0" : "30%",
          opacity: this.state.scrollTop===1 ? 1 : 0,
          transition: "2s all" 
        }}>
          <WrappedComponent />
        </div>
         )
    }
  }
 
}

export default withFadeInWhenInView;
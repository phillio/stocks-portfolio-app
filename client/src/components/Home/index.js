import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null
    }
  }

  render() {
    return (
      <div className="home-container">
        <div>
            <p>Stock API Data here</p>
        </div>
        <div>
            <p>$ Data here</p>
        </div>
      </div>
    );
  }
}

export default Home;

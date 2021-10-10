import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Navbar extends Component {

  render() {
    return (


      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container">
          <a className="navbar-brand" href="/"><b>Create your todo list on Blockchain</b></a>

          <div className="ms-auto d-md-flex align-items-center text-light">
            <h6 className="d-md-flex d-none me-2">{this.props.account}</h6>
            {this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                alt="logo"
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
            
          </div>


        </div>
      </nav>


    );
  }
}

export default Navbar;

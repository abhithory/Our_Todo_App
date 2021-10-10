import React, { Component } from 'react';
import Web3 from 'web3';
import OurTodoAppJson from '../abis/OurTodoApp.json'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Navbar from './Navbar'
import Main from './Main'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
  }

  async loadWeb3() {

    if (window.ethereum) {
       this.loadBlockchainData()
    } else {
      this.setState({ connected: false })
    }

  }

  async loadBlockchainData() {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    web3.eth.defaultAccount = accounts[0];
    this.setState({ account: accounts[0] })


    const networkId = await web3.eth.net.getId()
    const ourTodoAppData = OurTodoAppJson.networks[networkId]

    if (ourTodoAppData) {
      const ourTodoAppContract = web3.eth.Contract(OurTodoAppJson.abi, ourTodoAppData.address);
      this.setState({ ourTodoAppContract })
      // const contractName = await ourTodoAppContract.methods.appName().call();


      const totalTodos = await ourTodoAppContract.methods.getTotalTodo().call();

      await this.setState({ todos: [] });

      for (let i = 1; i <= totalTodos.toNumber(); i++) {
        let onetodo = await ourTodoAppContract.methods.getTodo(i).call();
        this.setState({
          todos: [...this.state.todos, onetodo]
        })
      }

      this.setState({ loading: false })

    } else {
      this.setState({ connected: false })
    }
  }

  addTodo = async (_content) => {

    this.setState({ loading: true })

    await this.state.ourTodoAppContract.methods.createTodo(_content)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        console.log('transactionHash', hash);
      })
      .on('receipt', (receipt) => {
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation', receipt);
        this.loadBlockchainData()
      })
      .on('error', (error, receipt) => {
        console.log('error', error)
        console.log('receipt', receipt)
        this.loadBlockchainData()
      });
  }

  setTodoCompleted = async (_id) => {

    this.setState({ loading: true })

    await this.state.ourTodoAppContract.methods.setTodoCompleted(_id)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        console.log('transactionHash', hash);
      })
      .on('receipt', (receipt) => {
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        this.loadBlockchainData()
      })
      .on('error', (error, receipt) => {
        console.log('error', error)
        console.log('receipt', receipt)
        this.loadBlockchainData()
      });
  }



  constructor(props) {
    super(props)
    this.state = {
      ourTodoAppContract: null,
      asTokenPrice: 0,
      account: '',
      todos: [],
      connected: true,
      loading: true
    }

    this.addTodo = this.addTodo.bind(this)
  }


  render() {
    return (
      <div className="d-flex flex-column " >
        {this.state.connected
          ?
          <>
            <Navbar account={this.state.account} />
            {this.state.loading
              ?
              <div className="text-center m-5" style={{ height: '100vh' }}>
                <div className="spinner-border bg-light m-auto" role="status">
                </div>
              </div>
              :
              <Main todos={this.state.todos} addTodoItem={this.addTodo} setTodoCompleted={this.setTodoCompleted} />
            }
          </>
          :
          <div className="container text-center bg-light my-5" style={{ borderRadius: 20 }}>
            <h1 className="mt-3 text-primary">Please Connect to Ropsten test network</h1>
            <a href="https://faucet.ropsten.be/" rel="noopener noreferrer" target="_blank" className="btn btn-success">Get free Ether for Ropsten test network</a>
            <h4 className="my-3">Follow these instructions for connect metamask with Ropsten test network</h4>
            <hr />

            <h6>1. Install  <a href="https://metamask.io/download.html" rel="noopener noreferrer" target="_blank" className="btn btn-outline-primary">Meta-mask</a></h6>
            <h6>2. Create Your Account</h6>
            <h6>3. Connect with Ropsten test network</h6>
            <h6>4. Get Some Free Ether by Ropsten Faucet</h6>
            <hr />
            <img className="img-fluid h-50" src="img/ropston.jpg" alt="" />

          </div>
        }
      </div>
    );
  }
}

export default App;

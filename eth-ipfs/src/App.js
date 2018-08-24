import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';

class App extends Component {
  state = {
    ipfsHash: null,
    buffer: '',
    ethAddress: '',
    blockNumber: '',
    transactionHash: '',
    gasUsed: '',
    txReceipt: ''
  };
  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };
  convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({ buffer });
  };

  onClick = async () => {

    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });

      //get Transaction Reciept
      await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
        console.log(err, txReceipt);
        this.setState({ txReceipt });
      }); //await for getTransactionReceipt

      await this.setState({
        blockNumber:
          this.state.txReceipt.blockNumber
      });
      await this.setState({ gasUsed: this.state.txReceipt.gasUsed });
    } //try
    catch (error) {
      console.log(error);
    } //Catch
  } //onClick
  onSubmit = async (event) => {
    event.preventDefault();

    //Users MetaMask account address
    const accounts = await web3.eth.getAccounts();

    console.log('Sending from MetaMask account:' + accounts[0]);

    //Obtain contract address from storehash.js
    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });

    //save document to IPFS, return its Hash#, and set hash# to state

    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);

      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });

      // Call Ethereum contract method sendHash and .send IPFS hash to ethereum contract
      // Returns transaction hash from the Ethereum contract

      storehash.methods.sendHash(this.state.ipfsHash).send({
        from: accounts[0]
      }, (error, transactionHash) => {
        console.log(transactionHash);
        this.setState({ transactionHash });
      }); //storeHash
    }) //await ipfs.add
  }; //onSubmit

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Secure File Upload & MetaMask Authentication</h1>
        </header>

        <hr />

        <grid>
          <h3> Choose file to send to IPFS</h3>
          <form onSubmit={this.onSubmit}>
            <input type="file"
              onChange={this.captureFile} />
            <button bsStyle="primary" type="submit">Send file</button>
          </form>
          <hr />

          <button onClick={this.onClick}>Get Transaction Receipt</button>
          <table bordered responsive>
            <thead>
              <tr>
                <th>Tx Receipt Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> IPFS Hash # Stored on Eth Contract</td>
                <td>{this.state.ipfsHash}</td>
              </tr>

              <tr>
                <td>Tx hash #</td>
                <td>{this.state.transactionHash}</td>
              </tr>

              <tr>
                <td>Block Number #
                </td>
                <td>
                  {this.state.blockNumber}
                </td>
              </tr>

              <tr>
                <td>Gas used #</td>
                <td>{this.state.gasUsed}</td>
              </tr>
            </tbody>
          </table>
        </grid>
      </div>
    );
  } //render
} //APP



export default App;



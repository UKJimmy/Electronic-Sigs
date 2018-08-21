//Overrides MetaMask v0.2 for our 1.0 Version.
//1.0 Lets us use async and await instead of promises

import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

export default web3;

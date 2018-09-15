import Web3 from'web3';

var provider = (window.web3.currentProvider);
const web3 = new Web3(provider);

export default web3;
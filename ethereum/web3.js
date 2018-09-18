//@dev: Configure web3 with provider from MetaMask
import Web3 from'web3';

/*var provider = (window.web3.currentProvider);
const web3 = new Web3(provider);*/

//@dwv-info: 'let' means redifine the variable
let web3;

//@dev-info: 'typeof' means the string is undefined on server 
if (typeof windows !== 'undefined' && typeof window.web3 !== 'undefined' ) {
    // we are in the browser AND MetaMask is running.
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on the server 'OR' the user is  not running MetaMask
    const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/e9c3ef2192494de8a3ba773a8526b459'    
    );
    web3 = new Web3(provider);
}

export default web3;

//@dev: 
const HDWalletProvider = require('truffle-hdwallet-provider');
//@dev: Web3 constructor
const Web3 = require("web3");
//@dev: Interface and bytecode from compile script
const compileFactory = require('./build/CampaignFactory.json'); 

const provider = new HDWalletProvider(
    'identify glare taxi control move grow wish tunnel pair cube flat crater',                      // account Mnemonic 12 words
    'https://rinkeby.infura.io/v3/e9c3ef2192494de8a3ba773a8526b459'                                 // URL address of test network
);

const web3 = new Web3(provider);                                                                    //instance of Web3 interact with test network

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();                                                  //function ONLY for using async 

    console.log('Attempting to deploy contract to account', accounts[0]);

    //@dev: instance of the contract
    const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({
        data: '0x' + compileFactory.bytecode
    })
    .send({
        gas:'1000000',
        from: accounts[0]
    });

    //@dev: get the contract address
    console.log('Contract deployed to ', result.options.address);
};

deploy();

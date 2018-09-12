const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const CompiledFactory = require('../ethereum/build/CampaignFactory.json');
const CompiledCampaign = require('../ethereum/build/Campaign.json');

//@dev: list of all accounts on the local network
let accounts;
//@dev: refrence to instance of the compiled 'factory' contracts interface we created
let factory;
//@dev: test instance of the campaing and assign it to the variables
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(CompiledFactory.interface))
    .deploy({
        data: CompiledFactory.bytecode
    })
    .send({
        from: accounts[0],
        gas: '1000000'
    });

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();                //function will retrun an array of addresses for deployed Capmaigns

    campaign = await new web3.eth.Contract(
        JSON.parse(CompiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaign', () => {
    it('deploy a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
});

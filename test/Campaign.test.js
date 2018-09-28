const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const CompiledFactory = require('../ethereum/build/CampaignFactory.json');
const CompiledCampaign = require('../ethereum/build/Campaign.json');

//@dev: list of all accounts on the local network
let accounts;
//@dev: refrence to instance of the compiled 'campaign' contracts interface we created
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

    await factory.methods
    .createCampaign('100')
    .send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods
    .getDeployedCampaigns()
    .call();                //function will retrun an array of addresses for deployed Capmaigns

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

    //@dev:
    it('marks caller as the campaihn manager', async () => {
        const manager = await campaign.methods.manager().call()
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute $$ and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value:'200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods
        .approvers(accounts[1])
        .call()
        assert(isContributor);
    });

    it('it requires minimun contribution', async () => {
        try {
           await campaign.methods
           .contribute()
           .send({
               value: '5',                      // value should be < than minimum amount we defined earlier
               from: accounts[1]
           }); 
           assert(false);                       //if ever this function get executed , terminate 
        } catch (err) {
            assert(err);                        //make shure we have an error object 
        }
    });

    //@dev: assert that manager has acability to make an request
    it('allows a manger to make a payment request', async () => {
        await campaign.methods
        .createRequest('test', '100', accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });

        const request = await campaign.methods
        .requests(0)
        .call();
        assert.equal('test', request.description);
    });

    //@dev: test which will finilize Campaign application from the start to the end
    it('it processes requests', async () => {
      
      await campaign.methods
      .contribute()
      .send({                 //contribute some money to campaign
          from: accounts[0],
          value: web3.utils.toWei('10','ether')                  //send and convert to ETH to transaction
      });

      await campaign.methods
      .createRequest('A',web3.utils.toWei('5','ether'),accounts[1])
      .send({
          from:accounts[0],
          gas:'1000000'
        });

        //@dev: vote to approve request
        await campaign.methods
        .approveRequest(0)
        .send({
            from: accounts[0],
            gas: '1000000'
        });

        //@dev:
        await campaign.methods
        .finalizeRequest(0)
        .send({
            from: accounts[0],                              //only manager can finalize the request
            gas:'1000000'
        });

        let balance = await web3.eth
        .getBalance(accounts[1]);                                    //balance = amount of money account[1] has
        
        balance = web3.utils
        .fromWei(balance, 'ether');                                  //convert balance from  Wei to ETH
        
        balance = parseFloat(balance);                               //take string and turn it yo decimal number
        console.log(balance);
        assert( balance > 104)
    });

});

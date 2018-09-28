//@dev: Tell web3 that a deployed copy of the 'campaignFactory' exist
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x866D15E1fb6636d60A3D4eE9aaDb4e67037E3412'
);

export default instance;
//@dev: Tell web3 that a deployed copy of the 'campaignFactory' exist
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9032004322a385138340EAe828c3D5d09EdC7A78'
);


export default instance;
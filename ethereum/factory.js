//@dev: Tell web3 that a deployed copy of the 'campaignFactory' exist
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xb76A49c3472c90724D3dB0D5Aaef42d18CA99D2B'
);

export default instance;
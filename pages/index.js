import React,{Component} from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    async componentDidMount() {
        const campaign = await factory.methods.getDeployedCampaigns().call()
        console.log(campaign);
    }

    render() {
        return <h1>Campaign Index page</h1>;
    }
}



//@dev: Use Factory instance to retreive a list of deployed campaigns
//@dev: use React to show something about each campaign

export default CampaignIndex ;
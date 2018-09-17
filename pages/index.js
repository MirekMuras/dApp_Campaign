import React,{Component} from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    //@dev-info: statis - 
    static async  getInitialProps() {
         const campaign = await factory.methods
        .getDeployedCampaigns()
        .call();
        return{campaign};
    }

    render() {
        return <h1>{this.props.campaign[0]}</h1>;
    }
}



//@dev: Use Factory instance to retreive a list of deployed campaigns
//@dev: use React to show something about each campaign

export default CampaignIndex ;
import React,{Component} from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    //@dev-info: statis - define a class function, without instantiating class
    static async  getInitialProps() {
         const campaign = await factory.methods
        .getDeployedCampaigns()
        .call();
        console.log(campaign);
        return{campaign};
    }

    render() {
        return <div>{this.props.campaign[0]}</div>;
    }
}



//@dev: Use Factory instance to retreive a list of deployed campaigns
//@dev: use React to show something about each campaign

export default CampaignIndex ;
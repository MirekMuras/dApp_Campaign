import React,{Component} from 'react';
import factory from '../ethereum/factory';
import {card, Card} from 'semantic-ui-react';
//import 'semantic-ui-css/semantic.min.css';

class CampaignIndex extends Component {
    //@dev-info: statis - define a class function, without instantiating class
    static async  getInitialProps() {
         const campaign = await factory.methods
        .getDeployedCampaigns()
        .call();
        return{campaign};
    }

    renderCampaign() {
        const items = this.props.campaign.map(address => {
            return {
                header: address,
                description:<a>Text</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return <div>{this.renderCampaign()}</div>;
    }
}



//@dev: Use Factory instance to retreive a list of deployed campaigns
//@dev: use React to show something about each campaign

export default CampaignIndex ;
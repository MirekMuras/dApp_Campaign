import React,{Component} from 'react';
import factory from '../ethereum/factory';
import {Button, Card} from 'semantic-ui-react';
import Layout from '../components/Layout';
//import 'semantic-ui-css/semantic.min.css';


//@dev: web3 that a deployed copy of the 'CampaignFactory'
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
                description:<a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    /*async componentDidMount() {
        const campaign = await factory.methods
        .getDeployedCampaigns()
        .call()
        console.log(campaign);
    }*/

    render() {
        return (
            <Layout>
                <div>
                    <link 
                        rel="stylesheet" 
                        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css">
                    </link>
                    <h3>Open Campaigns</h3>
                    {this.renderCampaign()}
                    <Button 
                        content="Create Campaign"
                        icon="add circle"
                        labelPosition="left"
                        primary            
                    />
                </div>
            </Layout>        
        );
    }
}

//@dev: Use Factory instance to retreive a list of deployed campaigns
//@dev: use React to show something about each campaign

export default CampaignIndex ;
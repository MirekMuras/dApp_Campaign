import React,{Component} from 'react';
import factory from '../ethereum/factory';
import {Button, Card} from 'semantic-ui-react';
import Layout from '../components/Layout';
//import 'semantic-ui-css/semantic.min.css';
import {Link} from '../routes';


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
                description:(
                    <Link route={`/campaigns/${address}`}>
                    <a>View Campaign</a>
                </Link>),
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
            
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                        <a> 
                           <Button 
                            floated="right"
                            content="Create Campaign"
                            icon="add circle"
                            labelPosition="left"
                            primary            
                            />
                        </a>                  
                    </Link>                    

                    {this.renderCampaign()}
                </div>
            </Layout>        
        );
    }
}

//@dev: Use Factory instance to retreive a list of deployed campaigns
//@dev: use React to show something about each campaign

export default CampaignIndex ;
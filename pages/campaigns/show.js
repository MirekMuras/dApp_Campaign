import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, GridColumn } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';


class CampaignShow extends Component {
    static async getInitialProps(props) {
        //console.log(props.query.address);
        const campaign = Campaign(props.querey.address);        //address of current address
        const summary = await campaign.methods
        .getSummary()
        .call();

        //console.log(summary);
        return {
            address: props.querey.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {

        const {
        minimumContribution,
        balance,
        requestsCount,
        approversCount,
        manager
        } = this.props;

        const items = [
            {
                header:manager,
                meta:'Address of Manager',
                description:'The manager created this campaign ',
                style: {overflowWrap: 'break-word'}
            },
            {
                header:web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ETH)',
                description:'Convert balance to Ether'
            }
        ];

        return <Card.Group items={items} />;
    }



    render() {
        return (
        <Layout>
            <h3>Campaign Show page</h3>

            <Grid>
            <Grid.Column width={10}>
                {this.renderCards()}
            </Grid.Column>

            <Grid.Column width={6}>
                <ContributeForm  address={this.props.address}/>
            </Grid.Column>  
            </Grid>
                    
            
        </Layout>
        );
    }
}

export default CampaignShow;
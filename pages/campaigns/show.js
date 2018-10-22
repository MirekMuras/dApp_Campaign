import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button , GridColumn, GridRow } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';
import { request } from 'https';


class CampaignShow extends Component {
    static async getInitialProps(props) {
        //console.log(props.query.address);
        const campaign = Campaign(props.query.address);        //address of current address
        
        const summary = await campaign.methods
        .getSummary()
        .call();

        //console.log(summary);
        return {
            address: props.query.address,
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
                description:'The manager created this campaign and can create request to withdraw money. ',
                style: {overflowWrap: 'break-word'}
            },
            {
                header:minimumContribution,
                meta:'Minimum Contribution (WEI)',
                description:'You must contribute at least this much WEI to bocome an approver. '
            },
            {
                header:requestsCount,
                meta:'Number of requests',
                description:'A request to withdraw money from the contract.'
            },
            {
                header: approversCount,
                meta:'Number of Approvers',
                description:'Number of people who have already donated to this campaign.'

            },
            {
                header:web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ETH)',
                description:'The balance is how much money this campaign has already spend.'
            }
        ];

        return <Card.Group items={items} />;
    }



    render() {
        return (
        <Layout>
            <h3>Campaign Show page</h3>

            <Grid>
                <GridRow>

                    <Grid.Column width={10}>
                    {this.renderCards()}
                          
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm  address={this.props.address}/>
                    </Grid.Column>

                </GridRow> 

                <GridRow>
                    <GridColumn>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>
                                View Requests
                                </Button>
                            </a>
                        </Link>
                    </GridColumn>         
                </GridRow>           

            </Grid>                    
            
        </Layout>
        );
    }
}

export default CampaignShow;
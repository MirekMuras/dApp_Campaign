import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';


class RequestIndex extends Component {

    static async getInitialProps(props) {
        const {address} = props.query;                  //total number of requests 
        const campaign = Campaign(address);            //passing address into Campaign function for a new instance campaing variable 
        const requestCount = await campaign.methods
        .getRequestCount()                              //returns a number inside a string
        .call();

        const request = await Promise.all(
            Array(parseInt(requestCount))               //Array constructor expects to be passed a number, use parseInt to pass a number into an Array
            .fill()
            .map((element, index) => {
                return campaign.methods
                    .requests(index)
                    .call();
            })
        );

        //console.log(request);
        return {address, request, requestCount};
    }

    renderRow() {
        return this.props.request.map((request, index) => {
            return <RequestRow 
            id={index}
            key={index}
            request={request}
            address={this.props.address}
            />;
        });
    }

    render() {
        const {Header, Row, HeaderCell, Body} = Table;                  //all proprty from Table tag

        return (
            <Layout>
                <h3>Request</h3>

                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary> Add Request </Button>
                    </a>
                </Link>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>                            
                        </Row>
                    </Header>  
                    <Body>
                        {this.renderRow()}
                    </Body>       
                </Table>
            </Layout>
        );
    }
}

export default RequestIndex;
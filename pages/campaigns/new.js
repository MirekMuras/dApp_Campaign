import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution:'',
        errorMessage:'',
        loading: false
    };

    //@dev: event-handler method
    onSubmit = async (event)=> {
        event.preventDefault();

        this.setState({ loading: true, errorMessage:''});

        try {
            const accounts = await web3.eth.getAccounts();      //lists of all accounts
            await factory.methods                               // create campaign on the contract
                .createCampaign(this.state.minimumContribution)
                .send({ 
                    from: accounts[0]
                });
                //console.log(accounts);
                Router.pushRoute('/');                          //redirect user to index rout
        } catch (err) {
            this.setState({ errorMessage: err.message });
            //console.log(err.message);
        }

        this.setState({ loading: false });
    };


    render() {
        return (
            <Layout>
                <h3>Create a Campaign !</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            placeholder='Enter minimum of 100 WEI here'
                            label="wei" 
                            labelPosition='right' 
                            value={this.state.minimumContribution}
                            onChange={event => 
                                this.setState({minimumContribution: event.target.value}) 
                            }
                        />
                    </Form.Field>

                    <Message error header='Oops!' content={this.state.errorMessage} />

                    <Button primary loading={this.state.loading} primary>
                    Create !
                    </Button>
                    
                </Form>
            </Layout>
        ); 
    }
}

export default CampaignNew;
import React, { Component } from 'react';
import { Button, Form, Input, Message} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';

class CampaignNew extends Component {
    state = {
        minimumContribution:'',
        errorMessage:''
    };

    //@dev: event-handeler method
    onSubmit = async event => {
        event.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({ from: accounts[0] }); 
        } catch (error) {
            this.state({ errorMessage: error.message });
        }
    };


    render() {
        return (
            <Layout>
                <h3>Create a Campaign !</h3>

                <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
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

                    <Button type='Create' primary>Create !</Button>
                </Form>
            </Layout>
        ); 
    }
}

export default CampaignNew

/** @info: two smart contracts ( Campaign & campaignFactory) */
pragma solidity ^0.4.17;

/* @dev Campaign factory creating a new Campaigns */
contract CampaignFactory {
    address[] public deployedCampaign;                                          //addresses of all deployed campaigns
    
   
    /* @dev: Deploys a new instance of a Campaign and store the resulting address*/
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);               //return a address af newly created campaign
        deployedCampaign.push(newCampaign);
    }
    
    /* @dev: returns a list of all deployed campaigns*/
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaign;                                               //return list of all campaigns which has been created
    }
}

contract Campaign {
    struct Request {
        string description;                 //describe WHY? the request is being created
        uint value;                         //amount of money that the manager wants to send over to the vendor
        address recipient;                  //address of the vendor that the money will be sent to
        bool complete;                      //TRUE if the request has been already processed(money sent)
        uint approvalCount;
        mapping(address=>bool)approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    //@dev: Only manager of the contract restriction
    modifier restricted() {
        require(msg.sender  == manager);
        _;
    }
    
    constructor(uint minimum, address newContractOwner) public {
        manager = newContractOwner;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;    //add a new key of address of approvers doner to mapping and give a value of TRUE
        approversCount++;                //after the person's key is added to mapping, increment.
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        //require(approvers[msg.sender]);
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]); //if this person already voted on this contract and they address exist on this mapping
        
        request.approvals[msg.sender] = true;        
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];              //verible asign to Request struct
        
        require(request.approvalCount > approversCount/2 );     //approvalCount must be more than 50% 
        require(!request.complete);                             //check that this request has not been completed before

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (uint,uint,uint,uint,address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns(uint) {
        return requests.length;
    }
    





}
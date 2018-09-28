const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//@dev: Delete entire 'build' folder, while we compile from compile.js
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

//@dev: Read 'Campaign.sol" from the 'contracts' folder
//@info: the Campaign.sol file has both contracts 'Campaign' and 'CampaignFactory'
const campaignPath = path.resolve(__dirname,'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

//@dev: Compile both contracts at 'Campaign' with solidity compiler, and write them both as JSON files
const output = solc.compile(source, 1).contracts;

//@dev: recreate the build folder
fs.ensureDirSync(buildPath);                     //check if directory exist, and if not exist, than create one



//console.log(output);
//@dev: Write output to the 'build' directory as JSON files
for (let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, `${contract.replace(':','')}.json`),
        output[contract]
    );
}
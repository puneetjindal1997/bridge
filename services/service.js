const { ethers } = require("hardhat");
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { ContractPromise,Abi} =require('@polkadot/api-contract');
const {assert} = require('@polkadot/util')



const bridgeEth=require("../artifacts/contracts/MyToken.sol/MyToken.json")
const bridgeBsc=require("../artifacts/contracts/MyTokenBSC.sol/MyTokenBSC.json");
const bridgePerr=require("../flipper/examples/erc20/target/ink/metadata.json")
// const serviceMan=require("../artifacts/contracts/serviceManager.sol/Manager.json");

const Contract_Address_Eth="0xF1B434A7ff31275A1a07bdb02F70f29aaA53f6bA"
const Contract_Address_Bsc="0x434f1c7a996A34ff65aaa366c57dbC022559705F"
const Contract_Address_Peer="5FS1dzGFsSqMM6P4fzZZRhnAiRMMoEcJiWvHYY8QcbX4CH5F"
// const Contract_Address_ServiceMan="0x4ad871c42306188C1000E10152ccf3ebacc18A6E"

const Private_Key = "c0c86b9a8dc848a971e84a8a0af4155b0df1aa3abe8c42188d244af91a4d31df"
const Bsc_Private_Key="0fe0ab869486d8bbbbc4bc8eb5d8fd13506aef11f164a15bcd1ac220ac573f83"
const Peer_Private_key="0xdb3e4304e3ea25c6da2a3f515787935e6de58d46002cf7092be5234f4bae2850"
// const ServiceMan_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"

const EThProvider=new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/e4cd759ca5a948dd82cb55b24c97e4d3`)
const BscProvider=new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
const PeerProvider=new WsProvider("ws://127.0.0.1:9944")
// const ServiceProvider=new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/ed2ce2f16b8d4d9ab207346c9ce17dc4`)


const EthSigner=new ethers.Wallet(Private_Key,EThProvider);
const BscSigner=new ethers.Wallet(Bsc_Private_Key,BscProvider);
// const ServiceSigner=new ethers.Wallet(ServiceMan_Private_Key,ServiceProvider);


const BridgeEth=new ethers.Contract(Contract_Address_Eth,bridgeEth.abi,EthSigner)
const BridgeBsc=new ethers.Contract(Contract_Address_Bsc,bridgeBsc.abi,BscSigner)
// const ServiceMan=new ethers.Contract(Contract_Address_ServiceMan,serviceMan.abi,ServiceSigner)

var sample = new Array();
sample.push(new Object());
async function main(){

  // const gas = 1000000;
  const api = await ApiPromise.create({PeerProvider})
  const PeerBridge = new ContractPromise(api, bridgePerr, Contract_Address_Peer)
  // console.log(await PeerBridge.query.totalSupply(gas))
    // the address we are going to query
const target = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const from = '5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL';

// only 1 param needed, the actual address we are querying for (more
// params can follow at the end, separated by , if needed by the message)
const callValue = await PeerBridge.query.totalSupply(target, { value: 0, gasLimit: -1 });
console.log(callValue.output.toHuman())
//console.log(callValue.output)
api.query.system.events((events) => {
  // console.log(`\nReceived ${events.length} events:`);
  // console.log("eventssssssss", ap)
  // // Loop through the Vec<EventRecord>
  events.forEach((record) => {
    console.log(record.event)
    console.log(record.event.toHuman())
    var test= sample;
      const index = record.event?.data[0];
      const eventTest = test[index];
  
      assert(eventTest, () => `Unable to find event with index ${index}`);
  
      console.log(eventTest.fromU8a(data.subarray(1))); 
  
    
    // if (record.event.method==='ContractEmitted' && record.event.section==='contracts'){
    //   console.log(record.event.toHuman())
    //   console.log(api.events.assets.Transferred.is)

    // }
  })
  //   // Extract the phase, event and the event types
  //   const { event, phase } = record;
  //   const types = event.typeDef;

  //   // Show what we are busy with
  //   console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
  //   console.log(`\t\t${event.meta.documentation}`);

  //   // Loop through each of the parameters, displaying the type and data
  //   event.data.forEach((data, index) => {
  //     console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
  //   });
  // });
});
    // BridgeEth.on("transfer", (from, to, amount) => {
    //     console.log(`done`);
    //   async function run(){
    //   const tx= await BridgeBsc.mint(to,amount,{gasLimit:3000000})
    //   console.log("Processing ...⏲")
    //   await tx.wait()
    //   console.log(" 🎉 Transaction Hash : ",tx.hash)
    //   console.log(`${ from } sent ${amount } to ${ to} ETH ===> BSC`);
    //     }
    //     run()
       
    // });


//     BridgeBsc.on("TransferBurnBsc", (from, to, amount,date,signature, event) => {
//         const tx=BridgeEth.mint(from,to,amount,signature);
//        console.log(`${ from } sent ${amount } to ${ to} BSC ===> ETH`);
//    });
}

main()
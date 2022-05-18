const Private_Key="c0c86b9a8dc848a971e84a8a0af4155b0df1aa3abe8c42188d244af91a4d31df"
const Contract_Address="0xF1B434A7ff31275A1a07bdb02F70f29aaA53f6bA"
// const Contract_Address_to="0xf2a6E0CF77AB7Dc47782d149057233342DA059FB"

const { keccak256, arrayify } = require("ethers/lib/utils");
const { ethers } = require("hardhat");



const contract=require("../artifacts/contracts/MyToken.sol/MyToken.json")


const provider=new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/e4cd759ca5a948dd82cb55b24c97e4d3`)

const signer=new ethers.Wallet(Private_Key,provider);

const BridgeEth=new ethers.Contract(Contract_Address,contract.abi,signer)
async function main() {
    // working 
    // const result=await BridgeEth.balanceOf(signer.address)
    // console.log(result)
    // const txnResult=await BridgeEth.Transfer("0xc7fd8b056B70CebCC9Da14DeB7b2786c899fAa7c", 10000)
    // console.log(txnResult.hash)

    // const reciverResult=await BridgeEth.balanceOf("0xc7fd8b056B70CebCC9Da14DeB7b2786c899fAa7c")
    // console.log(reciverResult)

    const txn = await BridgeEth.burn("0xc7fd8b056B70CebCC9Da14DeB7b2786c899fAa7c", 10000, {gasLimit:3000000})
    await txn.wait()
    console.log(txn.hash)

    // --working



//   const recipient= signer
  
//   const from=signer
//   const amount=1
//   // console.log(from.address)
//   // console.log(recipient.address)
//   // const message= ethers.utils.solidityKeccak256(["address","address","uint"],[from.address,recipient.address,amount]).toString("hex")
//   // const signature=await signer.signMessage(arrayify(message))
//   console.log("Transfering your Assets....")
//   const tx=await BridgeEth.burn(recipient.address,amount)
//   console.log("Wait while transaction is processing....")
//   await tx.wait()
//   console.log("Transaction processed with Transaction hash ",tx.hash)
  // const balance=await BridgeEth.getBalance(signer.address)
  // console.log(balance)
  // const tx=await BridgeEth.transfer("0x0cAAF9f9e41d3Ef18b308a5DaFe907A189412Da4",100)
  // const bal=await BridgeEth.getBalance("0x0cAAF9f9e41d3Ef18b308a5DaFe907A189412Da4")
  // console.log(bal)
}
main()

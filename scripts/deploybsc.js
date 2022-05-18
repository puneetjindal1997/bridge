const { ethers } = require("hardhat");

async function main(){
    const erc20=await  ethers.getContractFactory("MyTokenBSC");

    const ddd= await erc20.deploy()
    await ddd.deployed()

    console.log("here contract addresss",ddd.address)
}

main().then(()=>process.exit(0)).catch((err)=>{
    console.log(err)
    process.exit(1)
})
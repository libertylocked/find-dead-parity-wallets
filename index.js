const Web3 = require("web3");
const EthUtil = require("ethereumjs-util");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const startBlock = 4049249; // the block the now-dead library is deployed
const endBlock = 4511620; // sensibly recent block
const deadLibrary = "863df6bfa4469f3ead0be8f9f2aae51c91a907b4";

const findAffectedContractsInBlock = (blkNum) => {
  const addrs = [].concat(web3.eth.getBlock(blkNum, true).transactions.filter((tx) => {
    return tx.to === null && tx.input.indexOf(deadLibrary) !== -1;
  }).map(tx => getCreatedContractAddr(tx.from, tx.nonce)));
  return addrs;
}

const getCreatedContractAddr = (owner, nonce) => {
  return EthUtil.bufferToHex(EthUtil.generateAddress(owner, nonce));
}

// unused: this checks if the wallet contract is affected
const isContractAffected = (addr) => {
  return web3.eth.getCode(addr).indexOf(vulnLibray) !== -1;
}

// Main
let totalBal = 0;
// let affectedWallets = [];
for (let currBlk = startBlock; currBlk <= endBlock; currBlk++) {
  console.log("Scanning blk", currBlk);
  const addrs = findAffectedContractsInBlock(currBlk);
  if (addrs.length !== 0) {
    console.log("Dead wallet found in blk", currBlk);
    console.log(addrs.map(addr => {
      const bal = web3.fromWei(web3.eth.getBalance(addr));
      totalBal += bal;
      return [addr, bal.toString()];
    }));
  }
  // affectedWallets = affectedWallets.concat(addrs);
}

console.log("Done");
// console.log("Found affected addresses:", affectedWallets);
console.log("Total lost balance (ETH):", totalBal.toString());

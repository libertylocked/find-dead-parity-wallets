# Find dead parity wallets
A quick and hacky script to find all dead parity multisig wallets, due to recent library fuckup.

# Running the script
- Run geth
- Attach geth, `admin.startRPC()`
- `npm install`
- `node index.js | tee output.txt`
- Then you can grep the output

# Notes
- You can run a light geth node if you want, but that'd take forever. You can however RPC call a full node that's not running on your machine (e.g. INFURA) and rewrite the functions so that they are async.

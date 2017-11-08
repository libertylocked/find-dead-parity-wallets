# Find dead parity wallets
A quick and hacky script to find all dead parity multisig wallets, due to recent library fuckup.

- Run geth
- Attach geth, `admin.startRPC()`
- `npm install`
- `node index.js | tee output.txt`
- Then you can grep the output

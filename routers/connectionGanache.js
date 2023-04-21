const ganache = require('ganache');
const path = require('path');
const options = {
    account_keys_path: "./routers/accounts.json"
};

const server = ganache.server(options);
const PORT = 8545; // 0 means any available port


server.listen(PORT, async err => 
{
  if (err) throw err;
  console.log(`ganache listening on port ${server.address().port}...`);
  console.log("serv: ", server.address())
});
module.exports = server;

/*  const provider = server.provider;
  const accounts = await provider.request({
    method: "eth_accounts",
    params: []
  });*/
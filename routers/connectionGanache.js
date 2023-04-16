const ganache = require('ganache');
const path = require('path');
const options = {
    account_keys_path: "accounts.json"
};
//TODO добавить исключение для nodemoon , и снова выполнить выполнение
const server = ganache.server(options);
const PORT = 8545; // 0 means any available port


server.listen(PORT, async err => 
{
  if (err) throw err;
  console.log(`ganache listening on port ${server.address().port}...`);
});
module.exports = server;

/*  const provider = server.provider;
  const accounts = await provider.request({
    method: "eth_accounts",
    params: []
  });*/
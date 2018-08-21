//Infuria.IO NODE

//Setup Local Daemon

const IPFS = require('ipfs-api');
const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
})

/**Local Daemon Version
 * 
 * const ipfsApi = require('ipfs-api');
 * const ipfs = new apfsApi('localhost', '5001', {protocol:'http'});
 */

 export default ipfs;
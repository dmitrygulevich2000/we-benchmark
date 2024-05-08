const { WECounterDocker } = require('./Contract')
const path = require('node:path')

async function main() {
    const contract = await WECounterDocker.load();
    console.log(contract);
    const res = (await contract.override({contractName: 'Shit'})).heavy_increment(1, true)
    console.log(contract)
    return res
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
const { WECounterDocker } = require('./Contract')

async function main() {
    const contract = await WECounterDocker.load();
    return contract.deploy(1)
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
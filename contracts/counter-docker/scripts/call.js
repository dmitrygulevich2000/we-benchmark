const { WECounterDocker } = require('./Contract')

// TODO support command-line arguments
async function main() {
    const contract = await WECounterDocker.load();
    return contract.set(0)
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
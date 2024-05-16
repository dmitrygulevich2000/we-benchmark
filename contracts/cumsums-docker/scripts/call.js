const { WECumSumsDocker } = require('./Contract')

// TODO support command-line arguments
async function main() {
    const contract = await WECumSumsDocker.load();
    return contract.add(18, 1)
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
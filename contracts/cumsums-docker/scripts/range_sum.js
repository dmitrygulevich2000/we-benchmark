const { WECumSumsDocker } = require('./Contract')

async function main() {
    const contract = await WECumSumsDocker.load();
    if (process.argv.length < 4) {
        throw new Error('expected range bounds as arguments')
    }
    return contract.rangeSum(process.argv[2], process.argv[3])
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
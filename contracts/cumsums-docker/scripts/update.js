const { WECumSumsDocker } = require('./Contract')

async function main() {
    const contract = await WECumSumsDocker.load();
    return contract.update()
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
const { WECounterWasm } = require('./Contract')

async function main() {
    const contract = await WECounterWasm.load();
    return contract.deployWasm(1)
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
const { WEContext } = require('we-operation')

async function main() {
    const ctx = await WEContext.load();
    if (!process.argv[2]) {
        throw new Error('expected txId in 1st argument')
    }
    return ctx.txInfo(process.argv[2])
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
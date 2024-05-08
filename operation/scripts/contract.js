const { WEContext } = require('we-operation')

async function main() {
    const ctx = await WEContext.load();
    if (!process.argv[2]) {
        throw new Error('expected contractId in 1st argument')
    }
    return (await ctx.override({contractId: process.argv[2]})).contractState()
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
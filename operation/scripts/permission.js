const { WEContext } = require('we-operation')

async function main() {
    const ctx = await WEContext.load();
    return (await ctx.override({address: '3NopUHbfdwfsT4KtnbcKCkAuDqpnuSsUdFp'})).permission('remove', 'contract_validator')
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
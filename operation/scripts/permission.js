const { WEContext } = require('we-operation')

async function main() {
    const ctx = await WEContext.load();
    await ctx.override({address: "3NqTjZNugW79wpALQEq9WUytP4VbCTkJPeU"})
    return ctx.permission('add', 'contract_validator')
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
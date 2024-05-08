const { WEContext } = require('we-operation')

async function main() {
    const ctx = await WEContext.load();
    return ctx.permission('add', 'contract_developer')
}

if (require.main === module) {
    main().then((res) => {
        console.log(res)
        console.error('Success')
    }).catch((err) => {
        console.error(err)
    })
}
const { WECounterDocker } = require('./Contract')

async function do_calls(count) {
    const contract = await WECounterDocker.load()

    const arr = new Array(count).fill(0)
    const signedTxs = await Promise.all(arr.map(async () => {
        await new Promise(r => setTimeout(r, 10))
        return contract.deploy(0, true)
    }))
    const sentTxs = await Promise.all(signedTxs.map(async (tx) => {
        return contract.broadcast(tx)
    }))
    return sentTxs.map((tx) => { return tx.id} )
}

if (require.main === module) {
    do_calls(500).then((tx_ids) => {
        for (id of tx_ids) {
            console.log(id)
        }
        console.error("Success")
    }).catch((err) => {
        console.error(err)
    });
}
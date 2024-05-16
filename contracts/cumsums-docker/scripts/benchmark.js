const fs = require('node:fs')
const path = require('node:path')

const { WECumSumsDocker } = require('./Contract')

if (require.main === module) {
    benchmark(1, 500, 50).then((txIds) => {
        console.error(`successfully broadcasted ${txIds.length} transactions`)
        for (id of txIds) {
            console.log(id)
        }
        console.error("Success")
    }).catch((err) => {
        console.error(err)
    });
}

async function benchmark(contractsCount, txnsOnEachCount, touchKeysCount) {
    const contract = await WECumSumsDocker.load()

    let contractIds = []
    try {
        const data = fs.readFileSync(path.join(__dirname, 'contractIds.txt'), 'utf8')
        contractIds = data.trimEnd().split('\n')
    } catch (err) {
        return Promise.reject(err)
    }

    const signedTxs = []
    for (let j = 0; j < txnsOnEachCount; j += 1) {
        for (let i = 0; i < contractsCount; i += 1) {
            const currContract = await contract.override({ contractId: contractIds[i], contractVersion: 1 })
            signedTxs.push(await currContract.add(50 - touchKeysCount, 1, true))
        }
    }

    let error = null
    const txIds = []
    for (let tx of signedTxs) {
        await contract.broadcast(tx).then((sentTx) => {
            txIds.push(sentTx.id)
        }).catch((err) => {
            error = err
        })

    }
    if (error) {
        console.error('an error occurred:')
        console.error(error)
    }
    return txIds
}
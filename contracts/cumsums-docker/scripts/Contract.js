const { WEContext } = require('we-operation')

class WECumSumsDocker extends WEContext {
    static async load() {
        let contract = new WECumSumsDocker()
        const ctx = await WEContext.load()
        Object.assign(contract, ctx)
        return contract
    }

    deploy(size, signOnly = false) {
        return super.deploy([
            {
                key: 'size',
                type: 'integer',
                value: size,
            },
        ], signOnly)
    }

    async rangeSum(from, to) {
        const key_entries = await this.contractKeys([`cumsums_${from}`, `cumsums_${to}`])
        return key_entries[1].value - key_entries[0].value
    }

    add(index, delta, signOnly = false, atomic = false) {
        return this.call([
            {
                key: 'action', value: 'add', type: 'string'
            },
            {
                key: 'index', value: index, type: 'integer'
            },
            {
                key: 'delta', value: delta, type: 'integer'
            }
        ], signOnly, atomic)
    }
}

module.exports = {
    WECumSumsDocker
}
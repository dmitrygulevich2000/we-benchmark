const { WEContext } = require('we-operation')

class WECounterWasm extends WEContext {
    static async load() {
        let contract = new WECounterWasm()
        const ctx = await WEContext.load()
        Object.assign(contract, ctx)
        return contract
    }

    deployWasm(init, signOnly = false) {
        return super.deployWasm([
            {
                key: 'init',
                type: 'integer',
                value: init,
            },
        ], signOnly)
    }

    increment(by, signOnly = false) {
        return this.callWasm('increment', [
            {
                key: 'by', value: by, type: 'integer'
            }
        ], signOnly)
    }

    set(to, signOnly = false) {
        return this.callWasm('set', [
            {
                key: 'to', value: to, type: 'integer'
            }
        ], signOnly)
    }
}

module.exports = {
    WECounterWasm
}
const { WEContext } = require('we-operation')

class WECounterDocker extends WEContext {
    static async load() {
        let contract = new WECounterDocker()
        const ctx = await WEContext.load()
        Object.assign(contract, ctx)
        return contract
    }

    deploy(init, signOnly = false) {
        return super.deploy([
            {
                key: 'init',
                type: 'integer',
                value: init,
            },
        ], signOnly)
    }

    light_increment(by, signOnly = false) {
        return this.call([
            {
                key: 'action', value: 'light_increment', type: 'string'
            },
            {
                key: 'by', value: by, type: 'integer'
            }
        ], signOnly)
    }

    heavy_increment(by, signOnly = false) {
        return this.call([
            {
                key: 'action', value: 'heavy_increment', type: 'string'
            },
            {
                key: 'by', value: by, type: 'integer'
            }
        ], signOnly)
    }

    increment(by, signOnly = false) {
        return this.call([
            {
                key: 'action', value: 'increment', type: 'string'
            },
            {
                key: 'by', value: by, type: 'integer'
            }
        ], signOnly)
    }

    multiply(by, signOnly = false) {
        return this.call([
            {
                key: 'action', value: 'multiply', type: 'string'
            },
            {
                key: 'by', value: by, type: 'integer'
            }
        ], signOnly)
    }

    decrement(by, signOnly = false) {
        return this.call([
            {
                key: 'action', value: 'decrement', type: 'string'
            },
            {
                key: 'by', value: by, type: 'integer'
            }
        ], signOnly)
    }

    set(to, signOnly = false) {
        return super.call([
            {
                key: 'action', value: 'set', type: 'string'
            },
            {
                key: 'to', value: to, type: 'integer'
            }
        ], signOnly)
    }

    faulty_set(to, signOnly = false) {
        return this.call([
            {
                key: 'action', value: 'faulty_set', type: 'string'
            },
            {
                key: 'to', value: to, type: 'integer'
            }
        ], signOnly)
    }
}

module.exports = {
    WECounterDocker
}
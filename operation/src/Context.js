const { readFileSync, existsSync } = require("node:fs")
const path = require('node:path')

const { We } = require("@wavesenterprise/sdk");
const { Keypair } = require("@wavesenterprise/signer")
const { TRANSACTIONS } = require("@wavesenterprise/transactions-factory")

// WEContext provides:
// * access to node
// * some default parameter values defined in .we-context.json files
class WEContext {
    constructor() {
        this.context = {}
    }

    ///////////////////////////// context fill

    static async load(ctxDir) {
        if (ctxDir === undefined) {
            ctxDir = process.cwd()
        }
        ctxDir = path.resolve(ctxDir)
        let weCtx = new WEContext()
        let content = ''

        let ctxPath = path.join(ctxDir, '.we-context.json')
        if (existsSync(ctxPath)) {
            content = readFileSync(ctxPath, { encoding: 'utf8' });
            const context = JSON.parse(content)
            await weCtx.append(context)
        }
        while (ctxDir != '/') {
            ctxDir = path.dirname(ctxDir)

            ctxPath = path.join(ctxDir, '.we-context.json')
            if (existsSync(ctxPath)) {
                content = readFileSync(ctxPath, { encoding: 'utf8' });
                const context = JSON.parse(content)
                await weCtx.append(context)
            }
        }
        return weCtx
    }

    // TODO maybe support nested objects
    async append(otherCtx) {
        for (let key in otherCtx) {
            if (this.context[key] === undefined) {
                this.context[key] = otherCtx[key]
                await this.#onKeyUpdate(key, otherCtx[key])
            }
        }
        return this
    }

    async override(otherCtx) {
        for (let key in otherCtx) {
            this.context[key] = otherCtx[key]
            await this.#onKeyUpdate(key, otherCtx[key])
        }
        return this
    }

    // TODO add 'overridden' method returning modified copy

    ///////////////////////////// work with api

    async txInfo(txId) {
        return this.sdk.transactions.info(txId)
    }

    async contractState() {
        this.#checkDefined('contractId')
        return this.sdk.contracts.contractState(this.context.contractId)
    }

    async contractKeys(keys) {
        this.#checkDefined('contractId')
        return this.sdk.contracts.getKeys(this.context.contractId, keys)
    }

    async permission(op, role) {
        this.#checkDefined('nodeAddress', 'nodeKeystorePassword', 'address')
        const tx = {
            type: 102,
            version: 1,
            fee: 0,
            sender: this.context.nodeAddress,
            password: this.context.nodeKeystorePassword,
            target: this.context.address,
            opType: op,
            role: role,
            dueTimestamp: null,
        }
        return this.sdk.transactions.signAndBroadcast(tx)
    }

    ///////////////////////////// work with txns

    async broadcast(signedTx) {
        return this.sdk.broadcast(signedTx)
    }

    async deploy(params, signOnly = false) {
        this.#checkDefined('image', 'imageHash', 'contractName', 'contractValidation')

        const tx = TRANSACTIONS.CreateContract.V4({
            fee: 0,
            image: this.context.image,
            imageHash: this.context.imageHash,
            contractName: this.context.contractName,
            senderPublicKey: await this.keyPair.publicKey(),
            validationPolicy: { type: this.context.contractValidation ? 'majority' : 'any' },
            params: params,
            payments: [],
            apiVersion: "1.0",
        })

        if (signOnly) {
            return this.sdk.signer.getSignedTx(tx, this.keyPair)
        }
        return this.sdk.signer.getSignedTx(tx, this.keyPair).then((signedTx) => { return this.sdk.broadcast(signedTx) })
    }

    async deployWasm(params, signOnly = false) {
        this.#checkDefined('bytecode', 'bytecodeHash', 'contractName', 'contractValidation')

        const tx = TRANSACTIONS.CreateContract.V7({
            fee: 0,
            storedContract: {
                bytecode: this.context.bytecode,
                bytecodeHash: this.context.bytecodeHash,
            },
            contractName: this.context.contractName,
            senderPublicKey: await this.keyPair.publicKey(),
            validationPolicy: { type: this.context.contractValidation ? 'majority' : 'any' },
            params: params,
            payments: [],
            isConfidential: false,
            groupParticipants: [],
            groupOwners: [],
        })

        if (signOnly) {
            return this.sdk.signer.getSignedTx(tx, this.keyPair)
        }
        return this.sdk.signer.getSignedTx(tx, this.keyPair).then((signedTx) => { return this.sdk.broadcast(signedTx) })
    }

    async update(signOnly = false) {
        this.#checkDefined('image', 'imageHash', 'contractName', 'contractId', 'contractValidation')

        const tx = TRANSACTIONS.UpdateContract.V4({
            fee: 0,
            image: this.context.image,
            imageHash: this.context.imageHash,
            contractName: this.context.contractName,
            contractId: this.context.contractId,
            senderPublicKey: await this.keyPair.publicKey(),
            validationPolicy: { type: this.context.contractValidation ? 'majority' : 'any' },
            apiVersion: "1.0"
        })

        if (signOnly) {
            return this.sdk.signer.getSignedTx(tx, this.keyPair)
        }
        return this.sdk.signer.getSignedTx(tx, this.keyPair).then((signedTx) => { return this.sdk.broadcast(signedTx) })
    }

    async call(params, signOnly = false, atomic = false) {
        this.#checkDefined('contractId', 'contractVersion')

        const tx = TRANSACTIONS.CallContract.V5({
            fee: 0,
            contractId: this.context.contractId,
            contractVersion: this.context.contractVersion,
            senderPublicKey: await this.keyPair.publicKey(),
            params: params,
            payments: [],
            atomicBadge: atomic ? {} : null,
        })

        if (signOnly) {
            return this.sdk.signer.getSignedTx(tx, this.keyPair)
        }
        return this.sdk.signer.getSignedTx(tx, this.keyPair).then((signedTx) => { return this.sdk.broadcast(signedTx) })
    }

    async callWasm(callFunc, params, signOnly = false) {
        this.#checkDefined('contractId', 'contractVersion')

        const tx = TRANSACTIONS.CallContract.V7({
            fee: 0,
            contractId: this.context.contractId,
            contractVersion: this.context.contractVersion,
            senderPublicKey: await this.keyPair.publicKey(),
            callFunc: callFunc,
            params: params,
            payments: [],
            contractEngine: 'wasm',
        })

        if (signOnly) {
            return this.sdk.signer.getSignedTx(tx, this.keyPair)
        }
        return this.sdk.signer.getSignedTx(tx, this.keyPair).then((signedTx) => { return this.sdk.broadcast(signedTx) })
    }

    async sendAtomicTransaction(signedTxns, signOnly = false) {
        const tx = TRANSACTIONS.Atomic.V1({
            fee: 0,
            senderPublicKey: await this.keyPair.publicKey(),
            transactions: signedTxns.map((tx) => { return tx.getRawBody() }),
        })
        if (signOnly) {
            return this.sdk.signer.getSignedTx(tx, this.keyPair)
        }
        return this.sdk.signer.getSignedTx(tx, this.keyPair).then((signedTx) => { return this.sdk.broadcast(signedTx) })
    }

    ///////////////////////////// helpers

    async #onKeyUpdate(key, value) {
        if (key == 'nodeUrl') {
            this.sdk = new We(value);
        }
        if (key == 'seedPhrase') {
            this.keyPair = await Keypair.fromExistingSeedPhrase(value)
        }
    }

    #checkDefined(...keys) {
        for (let key of keys) {
            if (this.context[key] === undefined) {
                throw new Error(`undefined context key "${key}"`)
            }
        }
    }
}

module.exports = {
    WEContext,
}

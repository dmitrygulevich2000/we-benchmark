import {
  Action,
  Contract,
  ContractMapping,
  ContractValue,
  IncomingTx,
  ExecutionContext,
  JsonVar,
  logger,
  Param,
  Params,
  Tx,
  Var,
  Ctx,
} from '@wavesenterprise/contract-core'

import fs from 'node:fs';

@Contract()
export default class CumSums {

  // stores mapping { i => sum(arr[0:i]) | i in 0..=size }
  @Var() cumsums: ContractMapping<number>
  @Var() size: ContractValue<number>

  @Action({ onInit: true })
  async init(@Param('size') size: number, @Ctx() ctx: ExecutionContext) {
    this.log(ctx, `init(${size})`)
    for (let i = 0; i < size + 1; i += 1) {
      this.cumsums.set(i.toString(), 0)
    }
    this.size.set(size)
  }

  /////////////////////////////////////////////////////////////////////////////// benchmark

  @Action()
  async add(@Param('index') index: number, @Param('delta') delta: number, @Ctx() ctx: ExecutionContext) {
    const size = await this.size.get()
    for (let i = index + 1; i <= size; i += 1) {
      const cumsum = await this.cumsums.get(i.toString())
      this.cumsums.set(i.toString(), cumsum + delta)
    }
  }

  /////////////////////////////////////////////////////////////////////////////// helpers

  log(ctx: ExecutionContext, message: string) {
    console.log(`${ctx.tx.id.slice(0, 6)}... on height ${ctx.blockInfo.height}: ${message}`)
  }
}

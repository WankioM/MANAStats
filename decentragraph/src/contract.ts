import {
  Upgrade as UpgradeEvent,
  OwnerUpdate as OwnerUpdateEvent
} from "../generated/Contract/Contract"
import { Upgrade, OwnerUpdate } from "../generated/schema"

export function handleUpgrade(event: UpgradeEvent): void {
  let entity = new Upgrade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newContract = event.params.newContract
  entity.initializedWith = event.params.initializedWith

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerUpdate(event: OwnerUpdateEvent): void {
  let entity = new OwnerUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._prevOwner = event.params._prevOwner
  entity._newOwner = event.params._newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

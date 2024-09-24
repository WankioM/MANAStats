import {
  AuctionCreated as AuctionCreatedEvent,
  BidConversion as BidConversionEvent,
  BidSuccessful as BidSuccessfulEvent,
  AuctionFinished as AuctionFinishedEvent,
} from "../generated/Contract/Contract"
import {
  AuctionCreated,
  BidConversion,
  BidSuccessful,
  AuctionFinished,
  
} from "../generated/schema"

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity = new AuctionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._caller = event.params._caller
  entity._startTime = event.params._startTime
  entity._duration = event.params._duration
  entity._initialPrice = event.params._initialPrice
  entity._endPrice = event.params._endPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBidConversion(event: BidConversionEvent): void {
  let entity = new BidConversion(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._bidId = event.params._bidId
  entity._token = event.params._token
  entity._requiredManaAmountToBurn = event.params._requiredManaAmountToBurn
  entity._amountOfTokenConverted = event.params._amountOfTokenConverted
  entity._requiredTokenBalance = event.params._requiredTokenBalance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBidSuccessful(event: BidSuccessfulEvent): void {
  let entity = new BidSuccessful(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._bidId = event.params._bidId
  entity._beneficiary = event.params._beneficiary
  entity._token = event.params._token
  entity._pricePerLandInMana = event.params._pricePerLandInMana
  entity._manaAmountToBurn = event.params._manaAmountToBurn
  entity._xs = event.params._xs
  entity._ys = event.params._ys

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionFinished(event: AuctionFinishedEvent): void {
  let entity = new AuctionFinished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._caller = event.params._caller
  entity._time = event.params._time
  entity._pricePerLandInMana = event.params._pricePerLandInMana

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}



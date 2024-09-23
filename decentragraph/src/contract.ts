import {
  AuctionCreated as AuctionCreatedEvent,
  BidConversion as BidConversionEvent,
  BidSuccessful as BidSuccessfulEvent,
  AuctionFinished as AuctionFinishedEvent,
  TokenBurned as TokenBurnedEvent,
  TokenTransferred as TokenTransferredEvent,
  LandsLimitPerBidChanged as LandsLimitPerBidChangedEvent,
  GasPriceLimitChanged as GasPriceLimitChangedEvent,
  DexChanged as DexChangedEvent,
  TokenAllowed as TokenAllowedEvent,
  TokenDisabled as TokenDisabledEvent,
  ConversionFeeChanged as ConversionFeeChangedEvent,
  OwnershipRenounced as OwnershipRenouncedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/Contract/Contract"
import {
  AuctionCreated,
  BidConversion,
  BidSuccessful,
  AuctionFinished,
  TokenBurned,
  TokenTransferred,
  LandsLimitPerBidChanged,
  GasPriceLimitChanged,
  DexChanged,
  TokenAllowed,
  TokenDisabled,
  ConversionFeeChanged,
  OwnershipRenounced,
  OwnershipTransferred
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

export function handleTokenBurned(event: TokenBurnedEvent): void {
  let entity = new TokenBurned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._bidId = event.params._bidId
  entity._token = event.params._token
  entity._total = event.params._total

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenTransferred(event: TokenTransferredEvent): void {
  let entity = new TokenTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._bidId = event.params._bidId
  entity._token = event.params._token
  entity._to = event.params._to
  entity._total = event.params._total

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLandsLimitPerBidChanged(
  event: LandsLimitPerBidChangedEvent
): void {
  let entity = new LandsLimitPerBidChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._caller = event.params._caller
  entity._oldLandsLimitPerBid = event.params._oldLandsLimitPerBid
  entity._landsLimitPerBid = event.params._landsLimitPerBid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGasPriceLimitChanged(
  event: GasPriceLimitChangedEvent
): void {
  let entity = new GasPriceLimitChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._caller = event.params._caller
  entity._oldGasPriceLimit = event.params._oldGasPriceLimit
  entity._gasPriceLimit = event.params._gasPriceLimit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDexChanged(event: DexChangedEvent): void {
  let entity = new DexChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._caller = event.params._caller
  entity._oldDex = event.params._oldDex
  entity._dex = event.params._dex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenAllowed(event: TokenAllowedEvent): void {
  let entity = new TokenAllowed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._caller = event.params._caller
  entity._address = event.params._address
  entity._decimals = event.params._decimals
  entity._shouldBurnTokens = event.params._shouldBurnTokens
  entity._shouldForwardTokens = event.params._shouldForwardTokens
  entity._forwardTarget = event.params._forwardTarget

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenDisabled(event: TokenDisabledEvent): void {
  let entity = new TokenDisabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._caller = event.params._caller
  entity._address = event.params._address

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleConversionFeeChanged(
  event: ConversionFeeChangedEvent
): void {
  let entity = new ConversionFeeChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._caller = event.params._caller
  entity._oldConversionFee = event.params._oldConversionFee
  entity._conversionFee = event.params._conversionFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipRenounced(event: OwnershipRenouncedEvent): void {
  let entity = new OwnershipRenounced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

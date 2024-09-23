import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/Contract/Contract"

export function createAuctionCreatedEvent(
  _caller: Address,
  _startTime: BigInt,
  _duration: BigInt,
  _initialPrice: BigInt,
  _endPrice: BigInt
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("_caller", ethereum.Value.fromAddress(_caller))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_startTime",
      ethereum.Value.fromUnsignedBigInt(_startTime)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_duration",
      ethereum.Value.fromUnsignedBigInt(_duration)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_initialPrice",
      ethereum.Value.fromUnsignedBigInt(_initialPrice)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_endPrice",
      ethereum.Value.fromUnsignedBigInt(_endPrice)
    )
  )

  return auctionCreatedEvent
}

export function createBidConversionEvent(
  _bidId: BigInt,
  _token: Address,
  _requiredManaAmountToBurn: BigInt,
  _amountOfTokenConverted: BigInt,
  _requiredTokenBalance: BigInt
): BidConversion {
  let bidConversionEvent = changetype<BidConversion>(newMockEvent())

  bidConversionEvent.parameters = new Array()

  bidConversionEvent.parameters.push(
    new ethereum.EventParam("_bidId", ethereum.Value.fromUnsignedBigInt(_bidId))
  )
  bidConversionEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  )
  bidConversionEvent.parameters.push(
    new ethereum.EventParam(
      "_requiredManaAmountToBurn",
      ethereum.Value.fromUnsignedBigInt(_requiredManaAmountToBurn)
    )
  )
  bidConversionEvent.parameters.push(
    new ethereum.EventParam(
      "_amountOfTokenConverted",
      ethereum.Value.fromUnsignedBigInt(_amountOfTokenConverted)
    )
  )
  bidConversionEvent.parameters.push(
    new ethereum.EventParam(
      "_requiredTokenBalance",
      ethereum.Value.fromUnsignedBigInt(_requiredTokenBalance)
    )
  )

  return bidConversionEvent
}

export function createBidSuccessfulEvent(
  _bidId: BigInt,
  _beneficiary: Address,
  _token: Address,
  _pricePerLandInMana: BigInt,
  _manaAmountToBurn: BigInt,
  _xs: Array<BigInt>,
  _ys: Array<BigInt>
): BidSuccessful {
  let bidSuccessfulEvent = changetype<BidSuccessful>(newMockEvent())

  bidSuccessfulEvent.parameters = new Array()

  bidSuccessfulEvent.parameters.push(
    new ethereum.EventParam("_bidId", ethereum.Value.fromUnsignedBigInt(_bidId))
  )
  bidSuccessfulEvent.parameters.push(
    new ethereum.EventParam(
      "_beneficiary",
      ethereum.Value.fromAddress(_beneficiary)
    )
  )
  bidSuccessfulEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  )
  bidSuccessfulEvent.parameters.push(
    new ethereum.EventParam(
      "_pricePerLandInMana",
      ethereum.Value.fromUnsignedBigInt(_pricePerLandInMana)
    )
  )
  bidSuccessfulEvent.parameters.push(
    new ethereum.EventParam(
      "_manaAmountToBurn",
      ethereum.Value.fromUnsignedBigInt(_manaAmountToBurn)
    )
  )
  bidSuccessfulEvent.parameters.push(
    new ethereum.EventParam("_xs", ethereum.Value.fromSignedBigIntArray(_xs))
  )
  bidSuccessfulEvent.parameters.push(
    new ethereum.EventParam("_ys", ethereum.Value.fromSignedBigIntArray(_ys))
  )

  return bidSuccessfulEvent
}

export function createAuctionFinishedEvent(
  _caller: Address,
  _time: BigInt,
  _pricePerLandInMana: BigInt
): AuctionFinished {
  let auctionFinishedEvent = changetype<AuctionFinished>(newMockEvent())

  auctionFinishedEvent.parameters = new Array()

  auctionFinishedEvent.parameters.push(
    new ethereum.EventParam("_caller", ethereum.Value.fromAddress(_caller))
  )
  auctionFinishedEvent.parameters.push(
    new ethereum.EventParam("_time", ethereum.Value.fromUnsignedBigInt(_time))
  )
  auctionFinishedEvent.parameters.push(
    new ethereum.EventParam(
      "_pricePerLandInMana",
      ethereum.Value.fromUnsignedBigInt(_pricePerLandInMana)
    )
  )

  return auctionFinishedEvent
}

export function createTokenBurnedEvent(
  _bidId: BigInt,
  _token: Address,
  _total: BigInt
): TokenBurned {
  let tokenBurnedEvent = changetype<TokenBurned>(newMockEvent())

  tokenBurnedEvent.parameters = new Array()

  tokenBurnedEvent.parameters.push(
    new ethereum.EventParam("_bidId", ethereum.Value.fromUnsignedBigInt(_bidId))
  )
  tokenBurnedEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  )
  tokenBurnedEvent.parameters.push(
    new ethereum.EventParam("_total", ethereum.Value.fromUnsignedBigInt(_total))
  )

  return tokenBurnedEvent
}

export function createTokenTransferredEvent(
  _bidId: BigInt,
  _token: Address,
  _to: Address,
  _total: BigInt
): TokenTransferred {
  let tokenTransferredEvent = changetype<TokenTransferred>(newMockEvent())

  tokenTransferredEvent.parameters = new Array()

  tokenTransferredEvent.parameters.push(
    new ethereum.EventParam("_bidId", ethereum.Value.fromUnsignedBigInt(_bidId))
  )
  tokenTransferredEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  )
  tokenTransferredEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  tokenTransferredEvent.parameters.push(
    new ethereum.EventParam("_total", ethereum.Value.fromUnsignedBigInt(_total))
  )

  return tokenTransferredEvent
}

export function createLandsLimitPerBidChangedEvent(
  _caller: Address,
  _oldLandsLimitPerBid: BigInt,
  _landsLimitPerBid: BigInt
): LandsLimitPerBidChanged {
  let landsLimitPerBidChangedEvent = changetype<LandsLimitPerBidChanged>(
    newMockEvent()
  )

  landsLimitPerBidChangedEvent.parameters = new Array()

  landsLimitPerBidChangedEvent.parameters.push(
    new ethereum.EventParam("_caller", ethereum.Value.fromAddress(_caller))
  )
  landsLimitPerBidChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_oldLandsLimitPerBid",
      ethereum.Value.fromUnsignedBigInt(_oldLandsLimitPerBid)
    )
  )
  landsLimitPerBidChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_landsLimitPerBid",
      ethereum.Value.fromUnsignedBigInt(_landsLimitPerBid)
    )
  )

  return landsLimitPerBidChangedEvent
}

export function createGasPriceLimitChangedEvent(
  _caller: Address,
  _oldGasPriceLimit: BigInt,
  _gasPriceLimit: BigInt
): GasPriceLimitChanged {
  let gasPriceLimitChangedEvent = changetype<GasPriceLimitChanged>(
    newMockEvent()
  )

  gasPriceLimitChangedEvent.parameters = new Array()

  gasPriceLimitChangedEvent.parameters.push(
    new ethereum.EventParam("_caller", ethereum.Value.fromAddress(_caller))
  )
  gasPriceLimitChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_oldGasPriceLimit",
      ethereum.Value.fromUnsignedBigInt(_oldGasPriceLimit)
    )
  )
  gasPriceLimitChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_gasPriceLimit",
      ethereum.Value.fromUnsignedBigInt(_gasPriceLimit)
    )
  )

  return gasPriceLimitChangedEvent
}

export function createDexChangedEvent(
  _caller: Address,
  _oldDex: Address,
  _dex: Address
): DexChanged {
  let dexChangedEvent = changetype<DexChanged>(newMockEvent())

  dexChangedEvent.parameters = new Array()

  dexChangedEvent.parameters.push(
    new ethereum.EventParam("_caller", ethereum.Value.fromAddress(_caller))
  )
  dexChangedEvent.parameters.push(
    new ethereum.EventParam("_oldDex", ethereum.Value.fromAddress(_oldDex))
  )
  dexChangedEvent.parameters.push(
    new ethereum.EventParam("_dex", ethereum.Value.fromAddress(_dex))
  )

  return dexChangedEvent
}

export function createTokenAllowedEvent(
  _caller: Address,
  _address: Address,
  _decimals: BigInt,
  _shouldBurnTokens: boolean,
  _shouldForwardTokens: boolean,
  _forwardTarget: Address
): TokenAllowed {
  let tokenAllowedEvent = changetype<TokenAllowed>(newMockEvent())

  tokenAllowedEvent.parameters = new Array()

  tokenAllowedEvent.parameters.push(
    new ethereum.EventParam("_caller", ethereum.Value.fromAddress(_caller))
  )
  tokenAllowedEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )
  tokenAllowedEvent.parameters.push(
    new ethereum.EventParam(
      "_decimals",
      ethereum.Value.fromUnsignedBigInt(_decimals)
    )
  )
  tokenAllowedEvent.parameters.push(
    new ethereum.EventParam(
      "_shouldBurnTokens",
      ethereum.Value.fromBoolean(_shouldBurnTokens)
    )
  )
  tokenAllowedEvent.parameters.push(
    new ethereum.EventParam(
      "_shouldForwardTokens",
      ethereum.Value.fromBoolean(_shouldForwardTokens)
    )
  )
  tokenAllowedEvent.parameters.push(
    new ethereum.EventParam(
      "_forwardTarget",
      ethereum.Value.fromAddress(_forwardTarget)
    )
  )

  return tokenAllowedEvent
}

export function createTokenDisabledEvent(
  _caller: Address,
  _address: Address
): TokenDisabled {
  let tokenDisabledEvent = changetype<TokenDisabled>(newMockEvent())

  tokenDisabledEvent.parameters = new Array()

  tokenDisabledEvent.parameters.push(
    new ethereum.EventParam("_caller", ethereum.Value.fromAddress(_caller))
  )
  tokenDisabledEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return tokenDisabledEvent
}

export function createConversionFeeChangedEvent(
  _caller: Address,
  _oldConversionFee: BigInt,
  _conversionFee: BigInt
): ConversionFeeChanged {
  let conversionFeeChangedEvent = changetype<ConversionFeeChanged>(
    newMockEvent()
  )

  conversionFeeChangedEvent.parameters = new Array()

  conversionFeeChangedEvent.parameters.push(
    new ethereum.EventParam("_caller", ethereum.Value.fromAddress(_caller))
  )
  conversionFeeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_oldConversionFee",
      ethereum.Value.fromUnsignedBigInt(_oldConversionFee)
    )
  )
  conversionFeeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_conversionFee",
      ethereum.Value.fromUnsignedBigInt(_conversionFee)
    )
  )

  return conversionFeeChangedEvent
}

export function createOwnershipRenouncedEvent(
  previousOwner: Address
): OwnershipRenounced {
  let ownershipRenouncedEvent = changetype<OwnershipRenounced>(newMockEvent())

  ownershipRenouncedEvent.parameters = new Array()

  ownershipRenouncedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )

  return ownershipRenouncedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

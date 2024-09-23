import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AuctionCreated } from "../generated/schema"
import { AuctionCreated as AuctionCreatedEvent } from "../generated/Contract/Contract"
import { handleAuctionCreated } from "../src/contract"
import { createAuctionCreatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _caller = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _startTime = BigInt.fromI32(234)
    let _duration = BigInt.fromI32(234)
    let _initialPrice = BigInt.fromI32(234)
    let _endPrice = BigInt.fromI32(234)
    let newAuctionCreatedEvent = createAuctionCreatedEvent(
      _caller,
      _startTime,
      _duration,
      _initialPrice,
      _endPrice
    )
    handleAuctionCreated(newAuctionCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AuctionCreated created and stored", () => {
    assert.entityCount("AuctionCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_caller",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_startTime",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_duration",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_initialPrice",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_endPrice",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

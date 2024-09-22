import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { Upgrade } from "../generated/schema"
import { Upgrade as UpgradeEvent } from "../generated/Contract/Contract"
import { handleUpgrade } from "../src/contract"
import { createUpgradeEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let newContract = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let initializedWith = Bytes.fromI32(1234567890)
    let newUpgradeEvent = createUpgradeEvent(newContract, initializedWith)
    handleUpgrade(newUpgradeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Upgrade created and stored", () => {
    assert.entityCount("Upgrade", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Upgrade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newContract",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Upgrade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "initializedWith",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

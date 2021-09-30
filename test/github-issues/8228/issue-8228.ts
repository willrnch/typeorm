import { expect } from "chai";
import "reflect-metadata";
import { Connection } from "../../../src";
import { closeTestingConnections, createTestingConnections } from "../../utils/test-utils";
import { Block } from "./entity/Block";
import { Transaction } from "./entity/Transaction";
import { Event } from "./entity/Event";

describe.only("github issues > #8228 Unable to have multiple ManyToOne references on the same column", () => {

  let connections: Connection[];

  before(async () => connections = await createTestingConnections({
    entities: [Block, Transaction, Event],
    schemaCreate: true,
    dropSchema: true
  }));

  after(() => closeTestingConnections(connections));

  it("it should ....", async () => await Promise.all(connections.map(async connection => {
      const blockHash = "0x0001";
      const transactionHash = "0x0002";
      const transactionIndex = 0;

      const { manager } = connection;

      await manager.save(Block, {
        hash: blockHash,
      });

      await manager.save(Transaction, {
        hash: transactionHash,
        transactionIndex,
        blockHash,
      });

      await manager.save(Event, {
        blockHash,
        transactionIndex,
      });

      const events = await manager.find(Event, {
          relations: ["block"],
      });

      expect(events).length(1);
  })));

});

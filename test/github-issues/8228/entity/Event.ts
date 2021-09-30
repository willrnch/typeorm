import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "../../../../src";
import { Block } from "./Block";
import { Transaction } from "./Transaction";

@Entity()
export class Event {
    @PrimaryColumn({
        name: "block_hash",
    })
    blockHash: string;

    @PrimaryColumn({
        name: "transaction_index",
    })
    transactionIndex: number;

    @ManyToOne(
        () => Block,
        (block) => block.events,
        { createForeignKeyConstraints: false }
    )
    @JoinColumn({
        name: "block_hash",
        referencedColumnName: "hash",
    })
    block: Block;

    @ManyToOne(
        () => Transaction,
        (transaction) => transaction.events,
        { createForeignKeyConstraints: false }
    )
    @JoinColumn([{
        name: "transaction_index",
        referencedColumnName: "transactionIndex",
    }, {
        name: "block_hash",
        referencedColumnName: "blockHash",
    }])
    transaction: Transaction;
}

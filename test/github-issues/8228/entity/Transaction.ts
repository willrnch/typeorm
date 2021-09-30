import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "../../../../src";
import { Event } from "./Event";
import { Block } from "./Block";

@Entity()
export class Transaction {
    @PrimaryColumn()
    hash: string;

    @Column({
        name: "transaction_index",
    })
    transactionIndex: number;

    @Column({
        name: "block_hash",
    })
    blockHash: string;

    @ManyToOne(() => Block, (block) => block.transactions)
    @JoinColumn({
        name: "block_hash",
        referencedColumnName: "hash"
    })
    block: Block;

    @OneToMany(() => Event, (event) => event.transaction)
    events: Event[];
}

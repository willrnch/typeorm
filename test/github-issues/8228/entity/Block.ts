import { Entity, PrimaryColumn, OneToMany } from "../../../../src";
import { Transaction } from "./Transaction";
import { Event } from "./Event";

@Entity()
export class Block {
    @PrimaryColumn()
    hash: string;

    @OneToMany(() => Transaction, (transaction) => transaction.block)
    transactions: Transaction[];

    @OneToMany(() => Event, (event) => event.block)
    events: Event[];
}

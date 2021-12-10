import { getRandomEl } from './utilities.js';

export const COMPARATORS = [
    {val: null, text: "Please select."},
    {val: "=", text: "equal to"},
    {val: ">=", text: "more than or equal to"},
    {val: "<=", text: "less than or equal to"},
    {val: "any", text: "any number"}
]

export const NUMBERS = [
    {val: null, text: "Please select."},
    {val: 0, text: "0"},
    {val: 1, text: "1"},
    {val: 2, text: "2"},
    {val: 3, text: "3"},
    {val: 4, text: "4"},
    {val: 5, text: "5"},
    {val: 6, text: "6"},
    {val: -1, text: "the number of plain (non-blicket) blocks"}
]

export const RELIABILITIES = [
    {val: null, text: "Please select."},
    {val: 0.75, text: "usually"},
    {val: 1, text: "always"}
]

export class Branch {
    constructor(reliability, blicket_comparator, blicket_num, block_comparator, block_num) {
        if (!RELIABILITIES.map(x => x.val).includes(reliability)) {
            throw new Error("The reliability value is not valid.")
        }
        this.reliability = reliability;

        if (!COMPARATORS.map(x => x.val).includes(blicket_comparator)) {
            throw new Error("The blicket comparator value is not valid.")
        }
        this.blicket_comparator = blicket_comparator;

        if (!COMPARATORS.map(x => x.val).includes(block_comparator)) {
            throw new Error("The block comparator value is not valid.")
        }
        this.block_comparator = block_comparator;

        if (!NUMBERS.map(x => x.val).includes(blicket_num)) {
            throw new Error("The blicket number value is not valid.")
        }
        this.blicket_num = blicket_num;

        if (!NUMBERS.map(x => x.val).includes(block_num)) {
            throw new Error("The block number value is not valid.")
        }
        this.block_num = block_num;
    }

    reset () {
        this.reliability = null;
        this.blicket_comparator = null;
        this.blicket_num = null;
        this.block_comparator = null;
        this.block_num = null;
    }
};

export function makeRandomBranch() {
    let nonNullReliabilities = RELIABILITIES.slice(1, RELIABILITIES.length);
    let nonNullComparators = COMPARATORS.slice(1, COMPARATORS.length);
    let nonNullNumbers = NUMBERS.slice(1, NUMBERS.length);
    return new Branch(getRandomEl(nonNullReliabilities).val, getRandomEl(nonNullComparators).val, getRandomEl(nonNullNumbers).val, getRandomEl(nonNullComparators).val, getRandomEl(nonNullNumbers).val);
};

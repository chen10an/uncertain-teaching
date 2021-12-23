import { getRandomEl } from './utilities.js';

export const MAX_NUM_BRANCHES = 5;

export const COMPARATORS = [
    {val: null, text: ""},
    {val: "=", text: "equal to"},
    {val: ">=", text: "more than or equal to"},
    {val: "<=", text: "less than or equal to"},
    {val: "any", text: "any number"}
]

export const NUMBERS = [
    {val: null, text: ""},
    {val: 0, text: "0"},
    {val: 1, text: "1"},
    {val: 2, text: "2"},
    {val: 3, text: "3"},
    {val: 4, text: "4"},
    {val: 5, text: "5"},
    {val: 6, text: "6"},
    {val: "nonblicket_num", text: "the number of plain (non-blicket) blocks"}
]

export const RELIABILITIES = [
    {val: null, text: ""},
    {val: 0.75, text: "usually"},
    {val: 1, text: "always"}
]

export class Branch {
    constructor(reliability, blicket_comparator, blicket_num, nonblicket_comparator, nonblicket_num) {
        if (!RELIABILITIES.map(x => x.val).includes(reliability)) {
            throw new Error("The reliability value is not valid.")
        }
        this.reliability = reliability;

        if (!COMPARATORS.map(x => x.val).includes(blicket_comparator)) {
            throw new Error("The blicket comparator value is not valid.")
        }
        this.blicket_comparator = blicket_comparator;

        if (!COMPARATORS.map(x => x.val).includes(nonblicket_comparator)) {
            throw new Error("The nonblicket comparator value is not valid.")
        }
        this.nonblicket_comparator = nonblicket_comparator;

        if (!NUMBERS.map(x => x.val).includes(blicket_num)) {
            throw new Error("The blicket number value is not valid.")
        }
        this.blicket_num = blicket_num;

        if (!NUMBERS.map(x => x.val).slice(0, -1).includes(nonblicket_num)) {
            throw new Error("The nonblicket number value is not valid.")
        }
        this.nonblicket_num = nonblicket_num;
    }

    reset() {
        this.reliability = null;
        this.blicket_comparator = null;
        this.blicket_num = null;
        this.nonblicket_comparator = null;
        this.nonblicket_num = null;
    }

    check_is_complete() {
        // whether this branch has been fully filled out

        let nonNullReliabilityVals = RELIABILITIES.slice(1, RELIABILITIES.length).map(x => x.val);
        let nonNullComparatorVals = COMPARATORS.slice(1, COMPARATORS.length).map(x => x.val);
        let nonNullNumberVals = NUMBERS.slice(1, NUMBERS.length).map(x => x.val);

        let is_complete_reliability = nonNullReliabilityVals.includes(this.reliability);
        let is_complete_blickets = (this.blicket_comparator === "any") || (nonNullComparatorVals.includes(this.blicket_comparator) && nonNullNumberVals.includes(this.blicket_num))
        let is_complete_nonblickets = (this.nonblicket_comparator === "any") || (nonNullComparatorVals.includes(this.nonblicket_comparator) && nonNullNumberVals.slice(0, -1).includes(this.nonblicket_num))
        
        return is_complete_reliability && is_complete_blickets && is_complete_nonblickets;
    }

    getMinBlockNum() {
        // get the minimum number of total blocks needed to satisfy the rules (i.e., activate the blicket machine) in this branch

        let min_nonblickets = 0;
        if ((this.nonblicket_comparator === "=" || this.nonblicket_comparator === ">=") && (typeof(this.nonblicket_num) === "number")) {
            min_nonblickets = this.nonblicket_num;
        }
        
        let min_blickets = 0;
        if (this.blicket_comparator === "=" || this.blicket_comparator === ">=") {
            if (this.blicket_num === "nonblicket_num") {
                min_blickets = min_nonblickets;
            } else if (typeof(this.blicket_num) === "number") {
                min_blickets = this.blicket_num;
            }
        }

        return min_nonblickets + min_blickets;
    }
};

export function makeRandomBranch() {
    let nonNullReliabilities = RELIABILITIES.slice(1, RELIABILITIES.length);
    let nonNullComparators = COMPARATORS.slice(1, COMPARATORS.length);
    let nonNullNumbers = NUMBERS.slice(1, NUMBERS.length);
    
    return new Branch(getRandomEl(nonNullReliabilities).val, getRandomEl(nonNullComparators).val, getRandomEl(nonNullNumbers).val, getRandomEl(nonNullComparators).val, getRandomEl(nonNullNumbers.slice(0, -1)).val);
    // slice away the last number (represents equal to the number of nonblickets when choosing num blickets) for nonblickets
};

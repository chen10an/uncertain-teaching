<script>
    export let branch;
    export let under_max_blocks;
    export let is_complete;

    import Block from '../partials/Block.svelte';
    import { COMPARATORS,  NUMBERS, RELIABILITIES } from '../../modules/rule_classes.js';
    import { make_dummy_blicket, make_dummy_nonblicket, MAX_NUM_BLOCKS } from '../../modules/experiment_stores.js';

    // reactively set num to null if comparator is "any"
    $: {
        if (branch.blicket_comparator === "any") {
            branch.blicket_num = null;
        }
    }
    $: {
        if (branch.nonblicket_comparator == "any") {
            branch.nonblicket_num = null;
        }
    }
    
    // reactive checks
    $: under_max_blocks = branch.getMinBlockNum() <= MAX_NUM_BLOCKS;
    $: is_complete = branch.check_is_complete();
            
</script>

<div class="rule-unit">
    <span>
        <select bind:value="{branch.reliability}" class:null="{branch.reliability === null}">
            {#each RELIABILITIES as option}
                <option value={option.val}>
                    {option.text}
                </option>
            {/each}
        </select>
        when...
    </span>
    <div class="rule-unit">
        <span>
            the number of blickets <span style="display: inline-block;"><Block block={make_dummy_blicket(-1, -1)} is_mini={true} use_transitions="{false}" is_disabled="{true}" /></span> is
            <select bind:value="{branch.blicket_comparator}" class:null="{branch.blicket_comparator === null}">
                {#each COMPARATORS as option}
                    <option value={option.val}>
                        {option.text}
                    </option>
                {/each}
            </select>
            {#if branch.blicket_comparator != "any"}
                <select bind:value="{branch.blicket_num}" class:null="{branch.blicket_num === null}">
                    {#each NUMBERS as option}
                        <option value={option.val}>
                            {option.text}
                        </option>
                    {/each}
                </select>
            {/if}
        </span>
    </div>
    <div class="rule-unit">
        AND
    </div>
    <div class="rule-unit">
        <span>
            the number of plain (non-blicket) blocks <span style="display: inline-block;"><Block block={make_dummy_nonblicket(-1, -1)} is_mini={true} use_transitions="{false}" is_disabled="{true}" /></span> is
            <select bind:value="{branch.nonblicket_comparator}" class:null="{branch.nonblicket_comparator === null}">
                {#each COMPARATORS as option}
                    <option value={option.val}>
                        {option.text}
                    </option>
                {/each}
            </select>
            {#if branch.nonblicket_comparator != "any"}
                <select bind:value="{branch.nonblicket_num}" class:null="{branch.nonblicket_num === null}">
                    {#each NUMBERS.slice(0, -1) as option}
                        <option value={option.val}>
                            {option.text}
                        </option>
                    {/each}
                </select>
            {/if}
        </span>
    </div>

    <div class:hide="{under_max_blocks}" style="color: red;">
        <p>Too many (over {MAX_NUM_BLOCKS}) blickets and plain blocks are needed for an activation.</p>
    </div>
</div>

<style>
    select {
        border-width: 3px;
        font-size: 16px;
    }

    select.null {
        border-color: red;
    }
</style>

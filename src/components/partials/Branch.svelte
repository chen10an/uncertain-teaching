<script>
    export let branch;

    import Block from '../partials/Block.svelte';
    import { COMPARATORS,  NUMBERS, RELIABILITIES } from '../../modules/rule_classes.js';
    import { make_dummy_blicket, make_dummy_nonblicket } from '../../modules/experiment_stores.js';
</script>

<div class="rule-unit">
    <span>
        <select bind:value="{branch.reliability}">
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
            <select bind:value="{branch.blicket_comparator}">
                {#each COMPARATORS as option}
                    <option value={option.val}>
                        {option.text}
                    </option>
                {/each}
            </select>
            <select bind:value="{branch.blicket_num}">
                {#each NUMBERS as option}
                    <option value={option.val}>
                        {option.text}
                    </option>
                {/each}
            </select>
        </span>
    </div>
    <div class="rule-unit">
        AND
    </div>
    <div class="rule-unit">
        <span>
            the number of plain (non-blicket) blocks <span style="display: inline-block;"><Block block={make_dummy_nonblicket(-1, -1)} is_mini={true} use_transitions="{false}" is_disabled="{true}" /></span> is
            <select bind:value="{branch.block_comparator}">
                {#each COMPARATORS as option}
                    <option value={option.val}>
                        {option.text}
                    </option>
                {/each}
            </select>
            <select bind:value="{branch.block_num}">
                {#each NUMBERS.slice(0, -1) as option}
                    <option value={option.val}>
                        {option.text}
                    </option>
                {/each}
            </select>
        </span>
    </div>
</div>

<!-- <p>Are there times when the blicket machine <b>usually (but not always)</b> activates?
     <label><input type="radio" value="{true}">Yes</label>
     <label><input type="radio" value="{false}">No</label>
     </p>

     <p>If yes, the blicket machine <b>usually</b> activates when...</p>
     <p class="indent">the number of blickets is
     <select>
     {#each COMPARATORS as option}
     <option value={option.val}>
     {option.text}
     </option>
     {/each}
     </select>
     <select>
     {#each NUMBERS as option}
     <option value={option.val}>
     {option.text}
     </option>
     {/each}
     </select>
     AND the number of plain (non-blicket) blocks is
     <select>
     {#each COMPARATORS as option}
     <option value={option.val}>
     {option.text}
     </option>
     {/each}
     </select>
     <select>
     {#each NUMBERS.slice(0, -1) as option}
     <option value={option.val}>
     {option.text}
     </option>
     {/each}
     </select>
     .
     </p> --> 

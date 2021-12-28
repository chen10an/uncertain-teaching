<script>
    // bind in parent:
    export let is_done;
    export let visible_branches;
    export let min_num_branches = 1;  // minimum number of visible branches after random initialization
    
    import Branch from './Branch.svelte';
    import { Branch as BranchClass, makeRandomBranch, MAX_NUM_BRANCHES } from '../../modules/rule_classes.js';
    import { flip } from 'svelte/animate';
    import { receive } from '../../modules/crossfade.js';

    const FLIP_DURATION_MS = 300;

    let visible_up_to = Math.floor(Math.random() * (MAX_NUM_BRANCHES - min_num_branches) + min_num_branches);  // random (noninclusive) end dex for selecting which branches are visible; first branch is always visible
    let visible_dex = [...Array(visible_up_to).keys()];

    // define a fixed order/index to help transitions/animations target the correct branch
    let orderedBranches = [];
    for (let i=0; i < MAX_NUM_BRANCHES; i++) {
        if (i < visible_up_to) {
            orderedBranches.push({
                branch: makeRandomBranch(),
                under_max_blocks: null,
                is_complete: null
            });
        } else {
            orderedBranches.push({
                branch: new BranchClass(null, null, null, null, null),
                under_max_blocks: null,
                is_complete: null
            });
        }
    }

    // can't add more branches beyond the max
    $: hide_add_button = visible_dex.length >= MAX_NUM_BRANCHES;

    // participant is done when all branches don't exceed the max number of total blocks and is complete
    $: is_done = visible_dex.map(i => orderedBranches[i].under_max_blocks && orderedBranches[i].is_complete).every(under_and_complete => under_and_complete === true);

    $: visible_branches = visible_dex.map(i => orderedBranches[i]);
    
    async function addBranch() {
        if (visible_dex.length >= MAX_NUM_BRANCHES) {
            // TODO: show message about not allowing adding more
            return;
        }
        
        let dex = orderedBranches.map((x, i) => i).find(i => !visible_dex.includes(i));
        visible_dex.push(dex);
        visible_dex = visible_dex;  // trigger reactivity
    }

    function removeBranch(dex) {
        visible_dex.splice(visible_dex.findIndex(x => x == dex), 1);  // remove
        orderedBranches[dex].branch.reset();  // reset to null values so that when it gets added back it won't retain its previous select states
        visible_dex = visible_dex;  // trigger reactivity
    }

</script>

<div style="width: 100%;">
<h4>Your Explanation:</h4>
<p>The blicket machine activates...</p>
{#each visible_dex as dex (dex)}
    <div in:receive="{{key: ("rule_").concat(dex)}}" animate:flip="{{duration: FLIP_DURATION_MS}}" style="position: relative;">
        {#if dex >= 1}
            <div id="remove" on:click="{() => removeBranch(dex)}">&#10006;</div>
            <div class="rule-unit" style="width: fit-content;">
                OR
            </div>
        {/if}
        <Branch bind:branch="{orderedBranches[dex].branch}" bind:under_max_blocks="{orderedBranches[dex].under_max_blocks}" bind:is_complete="{orderedBranches[dex].is_complete}" />
    </div>
{/each}

<button style="min-width: 3rem;" on:click="{addBranch}" class:hide="{hide_add_button}">+</button>
<p>Otherwise, the blicket machine does nothing.</p>
</div>

<style>
    #remove {
        position: absolute;
        right: 20px;
        top: 40px;
        color: var(--dark-gray);
        cursor: pointer;
    }
</style>

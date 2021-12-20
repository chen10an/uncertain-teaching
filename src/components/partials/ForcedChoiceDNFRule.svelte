<script>
    export let is_done;
    
    import Branch from './Branch.svelte';
    import { Branch as BranchClass, makeRandomBranch } from '../../modules/rule_classes.js';
    import { flip } from 'svelte/animate';
    import { receive, send } from '../../modules/crossfade.js';

    const FLIP_DURATION_MS = 300;
    const MAX_NUM_BRANCHES = 5;

    let visibleUpTo = Math.max(Math.floor(Math.random() * MAX_NUM_BRANCHES), 1);  // random (noninclusive) end dex for selecting which branches are visible; first branch is always visible
    let visibleDex = [...Array(visibleUpTo).keys()];

    // define a fixed order/index to help transitions/animations target the correct branch
    let orderedBranches = [];
    for (let i=0; i < MAX_NUM_BRANCHES; i++) {
        if (i < visibleUpTo) {
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
    $: hide_add_button = visibleDex.length >= MAX_NUM_BRANCHES;

    // participant is done when all branches don't exceed the max number of total blocks and is complete
    $: is_done = visibleDex.map(i => orderedBranches[i].under_max_blocks && orderedBranches[i].is_complete).every(under_and_complete => under_and_complete === true);
    
    $: console.log(is_done)
    
    async function addBranch() {
        if (visibleDex.length >= MAX_NUM_BRANCHES) {
            // TODO: show message about not allowing adding more
            return;
        }
        
        let dex = orderedBranches.map((x, i) => i).find(i => !visibleDex.includes(i));
        visibleDex.push(dex);
        visibleDex = visibleDex;  // trigger reactivity
    }

    function removeBranch(dex) {
        visibleDex.splice(visibleDex.findIndex(x => x == dex), 1);  // remove
        orderedBranches[dex].branch.reset();  // reset to null values so that when it gets added back it won't retain its previous select states
        visibleDex = visibleDex;  // trigger reactivity
    }

</script>

<h3>Your Description:</h3>
<p>The blicket machine activates...</p>
{#each visibleDex as dex (dex)}
    <div in:receive="{{key: ("rule_").concat(dex)}}" out:send="{{key: ("rule_").concat(dex)}}" animate:flip="{{duration: FLIP_DURATION_MS}}" style="position: relative;"> 
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

<style>
    #remove {
        position: absolute;
        right: 20px;
        top: 40px;
        color: var(--dark-gray);
        cursor: pointer;
    }
</style>

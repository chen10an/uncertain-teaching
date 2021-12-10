<script>
    import Branch from './Branch.svelte';
    import { Branch as BranchClass, makeRandomBranch } from '../../modules/rule_classes.js';
    import { flip } from 'svelte/animate';
    import { receive, send } from '../../modules/crossfade.js';

    const FLIP_DURATION_MS = 300;
    const NUM_BRANCHES = 6

    let visibleUpTo = Math.max(Math.floor(Math.random() * NUM_BRANCHES), 1);  // random (noninclusive) end dex for selecting which branches are visible; first branch is always visible
    let visibleDex = [...Array(visibleUpTo).keys()];

    // define a fixed order/index to help transitions/animations target the correct branch
    let orderedBranches = [];
    for (let i=0; i < NUM_BRANCHES; i++) {
        if (i < visibleUpTo) {
            orderedBranches.push(makeRandomBranch());
        } else {
            orderedBranches.push(new BranchClass(null, null, null, null, null));
        }
    }
    
    $: hideAddButton = visibleDex.length >= NUM_BRANCHES;
    
    async function addBranch() {
        if (visibleDex.length >= NUM_BRANCHES) {
            // TODO: show message about not allowing adding more
            return;
        }
        
        let dex = orderedBranches.map((x, i) => i).find(i => !visibleDex.includes(i));
        visibleDex.push(dex);
        visibleDex = visibleDex;  // trigger reactivity
    }

    function removeBranch(dex) {
        visibleDex.splice(visibleDex.findIndex(x => x == dex), 1);  // remove
        orderedBranches[dex].reset();  // reset to null values so that when it gets added back it won't retain its previous select states
        visibleDex = visibleDex;  // trigger reactivity
    }

    $: console.log(visibleDex)
    $: console.log(orderedBranches)
</script>

<p>The blicket machine activates...</p>
{#each visibleDex as dex (dex)}
    <div in:receive="{{key: ("rule_").concat(dex)}}" out:send="{{key: ("rule_").concat(dex)}}" animate:flip="{{duration: FLIP_DURATION_MS}}" style="position: relative;"> 
        {#if dex >= 1}
            <div id="remove" on:click="{() => removeBranch(dex)}">&#10006;</div>
            <div class="rule-unit" style="width: fit-content;">
                OR
            </div>
        {/if}
        <Branch bind:branch="{orderedBranches[dex]}" />
    </div>
{/each}
<button style="min-width: 3rem;" on:click="{addBranch}" class:hide="{hideAddButton}">+</button>
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

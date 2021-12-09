<script>
    import SingleConj from './SingleConj.svelte';
    import { Conj } from '../../modules/rule_classes.js';
    import { flip } from 'svelte/animate';
    import { receive, send } from '../../modules/crossfade.js';

    const FLIP_DURATION_MS = 300;

    // define local ids to help transitions/animations target the correct conj object
    let conjsWithIds = [
        {conj: new Conj(null, null, null, null, null), id: 0},
        {conj: new Conj(null, null, null, null, null), id: 1},
        {conj: new Conj(null, null, null, null, null), id: 2},
        {conj: new Conj(null, null, null, null, null), id: 3},
        {conj: new Conj(null, null, null, null, null), id: 4},
        {conj: new Conj(null, null, null, null, null), id: 5}
    ];
    let visibleIds = [0];
    $: hideAddButton = visibleIds.length >= 6;
    
    async function addConj() {
        if (visibleIds.length >= 6) {
            // TODO: show message about not allowing adding more than 6
            return;
        }
        
        let id = conjsWithIds.map(x => x.id).find(id => !visibleIds.includes(id));
        visibleIds.push(id);
        visibleIds = visibleIds;  // trigger reactivity
    }

    function removeConj(id) {
        let dex = visibleIds.findIndex(x => x == id);
        visibleIds.splice(dex, 1);
        visibleIds = visibleIds;  // trigger reactivity
    }

    $: console.log(visibleIds)
</script>

<p>The blicket machine activates...</p>
{#each visibleIds as id (id)}
    <div in:receive="{{key: ("rule_").concat(id)}}" out:send="{{key: ("rule_").concat(id)}}" animate:flip="{{duration: FLIP_DURATION_MS}}" style="position: relative;"> 
        {#if id >= 1}
            <div id="remove" on:click="{() => removeConj(id)}">&#10006;</div>
            <div class="rule-unit" style="width: fit-content;">
                OR
            </div>
        {/if}
        <SingleConj bind:conj="{conjsWithIds[id]}" />
        <!-- conjsWithIds[id] works because the id is the same as the index -->
    </div>
{/each}
<button style="min-width: 3rem;" on:click="{addConj}" class:hide="{hideAddButton}">+</button>
<p>Otherwise, the blicket machine does nothing.</p>

<style>
    #remove {
        position: absolute;
        right: 20px;
        top: 50px;
        color: var(--dark-gray);
        cursor: pointer;
    }
</style>

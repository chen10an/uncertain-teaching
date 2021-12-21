<script>
    
    // props
    export let teacher_sess;  // session id of the teacher
    export let collection_prefix;  // prefix of collection id
    export let machine_name;  // shows up on UI to help participant distinguish between the different machines
    
    // Imports
    import TeacherExample from './TeacherExample.svelte';
    import { teacher_to_collection_to_ex } from '../../condition_configs/all_conditions.js';

</script>

<h2>Teacher's Examples of Blicket Machine {machine_name}</h2>
    
<div class="qa-container">
    {#each teacher_to_collection_to_ex[teacher_sess][collection_prefix] as ex, i}
        <div class="qa">
            <p style="margin-top: 0;"><b>Example {i+1}</b></p>
            <TeacherExample blicket_nonblicket_combo="{ex.blicket_nonblicket_combo}" show_positive_detector="{ex.detector_state}" collection_id="{collection_prefix}_piles_{i}" />
        </div>
    {/each}
</div>

<style>
    .qa-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

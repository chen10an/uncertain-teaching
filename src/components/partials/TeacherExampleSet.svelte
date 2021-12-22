<script>
    
    // props
    export let collection_prefix;  // prefix of collection id
    
    // Imports
    import TeacherExample from './TeacherExample.svelte';
    import { quiz_data_dict } from '../../modules/experiment_stores.js';

</script>
    
<div class="qa-container">
    <!-- svelte-ignore missing-declaration -->
    {#each $quiz_data_dict[collection_prefix].teaching_ex as ex, i}
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

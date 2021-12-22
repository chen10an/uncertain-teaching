<script>
    import { dev_mode } from '../../modules/experiment_stores.js';
    // dev_mode.set(true);

    // Props
    export let collection_id;  // components with the same collection id will use the same block objects from block_dict in module/experiment_stores.js
    export let quiz_dex;  // 0-based index of where this quiz falls in a larger sequence of quizzes / teaching example sets
    export let max_quiz_dex;  // maximum dex
    
    import { quiz_data_dict } from '../../modules/experiment_stores.js';
    
    // set some default values for convenience during testing, but do this only in dev mode
    if ($dev_mode) {
        if (collection_id === undefined) {
            collection_id = "noisy_conj3";

            quiz_data_dict.update(dict => {
                dict[collection_id] = {
                    teaching_ex: [{blicket_nonblicket_combo: "****", detector_state: true}, {blicket_nonblicket_combo: "***", detector_state: true}, {blicket_nonblicket_combo: "***", detector_state: false}, {blicket_nonblicket_combo: "**", detector_state: false}, {blicket_nonblicket_combo: "*", detector_state: false}]
                };
                return dict;
            });
        }

        if (quiz_dex === undefined) {
            quiz_dex = 0;
        }

        if (max_quiz_dex === undefined) {
            max_quiz_dex = 2;
        }
    }

    // Imports
    import CenteredCard from '../partials/CenteredCard.svelte';
    import TeacherExampleSet from '../partials/TeacherExampleSet.svelte';
    import ForcedChoiceDNFRule from '../partials/ForcedChoiceDNFRule.svelte';
    import { feedback, FADE_DURATION_MS, FADE_IN_DELAY_MS, raw_current_score, bonus_val, bonus_currency_str, make_dummy_blicket, make_dummy_nonblicket } from '../../modules/experiment_stores.js';
    import { tooltip } from '../../modules/tooltip.js';
    import { long_bonus_time, short_bonus_time, teaching_bonus_val } from '../../condition_configs/all_conditions.js';
    import { roundMoney } from '../../modules/utilities.js';
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    
    // Initialize and store variables
    let scrollY = 0;

    $: is_last = quiz_dex == max_quiz_dex;  // whether this is the last quiz before the end of the experiment

    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVXYZ";  // for naming blicket machines (the names always aappear in alphabetical order while the order of the underlying forms are suffled between conditions)
    let machine_name = ALPHABET[quiz_dex];

    // Store participant answers
    quiz_data_dict.update(dict => {
        dict[collection_id].rule = null;
        dict[collection_id].is_confident = null;

        return dict;
    });

    // check whether the participant has given an answer to all problems on the current page
    let rule_is_done = false;
    $: is_confident_is_done = $quiz_data_dict[collection_id].is_confident === true || $quiz_data_dict[collection_id].is_confident === false;
    $: answered_all = rule_is_done && is_confident_is_done;
    
    // Click handlers

    // event dispatcher for communicating with parent components
    const dispatch = createEventDispatcher();
    function submit_answers() {
        // TODO: calculate score
        
        if (is_last) {
            feedback.set(escape_quotes($feedback));
        }
        
        // tell parent components to move on to the next component
        dispatch("continue");
    }
    
    // Helper functions

    function escape_quotes(str) {
        let ret = str.replaceAll('"', '\\"');
        ret = ret.replaceAll("'", "\\'");
        return ret;
    }

    function skip_validation() {
        answered_all = true;
    }
</script>

<svelte:window bind:scrollY={scrollY}/>

<CenteredCard is_large={true} has_button={false}>
    <h2>Teacher's Example Set ({quiz_dex+1}/{max_quiz_dex+1}): Blicket Machine {machine_name}</h2>

    <!-- <h3>Do you think these blocks are blickets?</h3>
         <p style="margin: 0 0 2rem 0;">The closer you are to the correct rating (10 for blickets, 0 for non-blickets), the bigger your bonus will be (up to {$bonus_currency_str}{roundMoney($bonus_val)} per rating). The correct ratings will be revealed at the end of the study and your corresponding bonus will be sent <b>within {short_bonus_time}</b>.</p> -->
        
    <TeacherExampleSet collection_prefix="{collection_id}" />
    <h3>Given the teacher's examples, how do you think blicket machine {machine_name} works?</h3>
    
    <ForcedChoiceDNFRule bind:is_done="{rule_is_done}" bind:visible_branches="{$quiz_data_dict[collection_id].rule}" />
    
    <h3>Do you think the teacher is confident about knowing how blicket machine {machine_name} works?
        <label><input type="radio" bind:group="{$quiz_data_dict[collection_id].is_confident}" value="{true}">Yes</label>
        <label><input type="radio" bind:group="{$quiz_data_dict[collection_id].is_confident}" value="{false}">No</label>
    </h3>
    
    {#if is_last}
        <h3 style="margin-bottom: 0;">Do you have any feedback for us? (Optional)</h3>
        <p>We're at the end of the study and we're interested in hearing your thoughts on how fun/boring the study was, how this website can be improved, or anything else! Thank you in advance :)</p>
        <textarea class:hide="{!is_last}" bind:value={$feedback}></textarea>
    {/if}
    <button on:click="{submit_answers}" disabled="{!answered_all}">
        Submit
    </button>
    
    <div class:hide={answered_all} class="wrong">
        <p style="margin-bottom: 0;">You will be able to submit after you have:</p>
        <ul style="margin: 0;">
            {#if !rule_is_done}
                <li>completed your description. There should be no red dropdowns or text in your description.
            {/if}
            {#if !is_confident_is_done}
                <li>answered whether the teacher is confident.</li>
            {/if}
        </ul>
    </div>
    
    <button class:hide="{!$dev_mode}" on:click="{skip_validation}">dev: skip form validation</button>
</CenteredCard>

<style>
    textarea {
        width: 70%;
        height: 3rem;
    }

    .wrong {
        color: red;
        margin-bottom: 0;
    }
</style>

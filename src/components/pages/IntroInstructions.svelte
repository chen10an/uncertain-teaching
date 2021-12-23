<script>
    export let collection_id = "intro";
    
    import { dev_mode } from '../../modules/experiment_stores.js';
    import { qa_dict, short_bonus_time, student_bonus_val } from '../../condition_configs/all_conditions.js';
    import CenteredCard from '../partials/CenteredCard.svelte';
    import CoolWarmCaptcha from '../partials/CoolWarmCaptcha.svelte';
    import WinnieThePooh from '../partials/WinnieThePooh.svelte';
    import Block from '../partials/Block.svelte';
    import { FADE_DURATION_MS, FADE_IN_DELAY_MS, bonus_currency_str, make_dummy_blicket, make_dummy_nonblicket, intro_incorrect_clicks, MAX_NUM_BLOCKS, duration_str, quiz_data_dict } from '../../modules/experiment_stores.js';
    import TwoPilesAndDetector from '../partials/TwoPilesAndDetector.svelte';
    import TeacherExampleSet from '../partials/TeacherExampleSet.svelte';
    import PracticeRule from '../partials/PracticeRule.svelte';
    import { roundMoney } from '../../modules/utilities.js';
    import { fade } from 'svelte/transition';
    import { createEventDispatcher, tick } from 'svelte';

    // set some default values for convenience during testing, but do this only in dev mode
    if ($dev_mode) {
        if (Object.keys($quiz_data_dict).length === 0) {
            collection_id = "noisy_conj3";

            quiz_data_dict.update(dict => {
                dict[collection_id] = {
                    teaching_ex: [{blicket_nonblicket_combo: "****", detector_state: true}, {blicket_nonblicket_combo: "***", detector_state: true}, {blicket_nonblicket_combo: "***", detector_state: false}, {blicket_nonblicket_combo: "**", detector_state: false}, {blicket_nonblicket_combo: "*", detector_state: false}]
                };
                return dict;
            });
        }
    }


    // Constants
    const dispatch = createEventDispatcher();  // for communicating with parent components
    const MAX_CLICKS = 10;  // total number of _unsuccessful_ continue clicks allowed on the comprehension checks / captchas before forcing the end of the experiment
    let checking_container;  // bind to div that contains the subpages
    let show_feedback = false;  // whether to show feedback on the current page
    
    // Comprehension checks and captchas
    let page_dex = -3;  // multipage checks
    let all_correct = false;  // whether all understanding/captcha questions are correct on the current page
    let passed_captcha = false;  // bind to CoolWarmCaptcha
    let passed_practice = false;  // bind to PracticeRule
    intro_incorrect_clicks.update(dict => {
        // initialize all possible keys for comprehension/captcha checks
        dict["checking_page_-3"] = 0;
        dict["checking_page_-2"] = 0;
        dict["checking_page_-1"] = 0;
        return dict;
    });

    // dynamically update all_correct for the comprehension/captcha checks
    $: {
        all_correct = true;  // start with true then flip to false depending on the checks below
        if (page_dex === -3) {
            all_correct = passed_practice;
        } else if (page_dex === -2) {
            for (const key in qa_dict) {
                if (qa_dict[key].answer !== qa_dict[key].correct_answer) {
                    all_correct = false;
                }
            }
        } else if (page_dex === -1) {
            all_correct = passed_captcha; 
        } else {
            all_correct = false;
        }
    }

    // dynamically update whether participant can continue to next subpage
    $: can_cont = all_correct
    // negative page numbers need all correct answers (for practice/comprehension/captcha checks)

    // Click handler    
    async function cont() {
        if (can_cont && page_dex === -1) {
            dispatch("continue");

            if ($dev_mode) {
                console.log("dispatched normal continue");
            }
            
        } else if (can_cont) {
            // check if we can continue when page_dex < ordered_fform_keys.length
            
            page_dex += 1;
            show_feedback = false;
            checking_container.scrollTop = 0;  // scroll back to top of container
            
        } else {
            if (page_dex < 0 && !all_correct) {
                // only count clicks when !all_correct on the comprehension/captch pages (negative page numbers)
                intro_incorrect_clicks.update(dict => {
                    dict[`checking_page_${page_dex}`] += 1;
                    return dict;
                });
                
                if (Object.values($intro_incorrect_clicks).reduce((a,b) => a+b, 0) >= MAX_CLICKS) {
                    // if total incorrect clicks exceeds the max allowed, then force the end of the experiment
                    dispatch("continue", {trouble: true});
                    
                    if ($dev_mode) {
                        console.log("dispatched trouble");
                    }
                }
            }
            
            show_feedback = true;
            await tick();
            checking_container.scrollTop = checking_container.scrollHeight;  // scroll to bottom of container so that the participant can see the feedback
        }
    }
</script>

<CenteredCard is_large={true} has_button={false}>
    <h2 style="margin: 0;">Welcome to a Research Study by the University of Edinburgh</h2>
    <div>
        <p style="color: red;"><b>Please do NOT reload the page. You will be unable to complete the study.</b></p>
        
        <p>Welcome to our research study! We're interested in understanding how you learn about "blicket machines" from a teacher, and we hope that you have fun in the process.</p>

        <h3>Overview</h3>
        <ul>
            <li>Our study lasts around {$duration_str} in total. You will see {Object.keys($quiz_data_dict).length} sets of examples, each created by a teacher who wants to teach you how a "blicket machine" works.</li>
            <li><b>Your answers can earn a total bonus of up to {$bonus_currency_str}{roundMoney(student_bonus_val*Object.keys($quiz_data_dict).length)}. Your bonus will be sent within <b>{short_bonus_time}</b>.
            </li>
        </ul>
        
        <h3>Blicket Machines</h3>
        <p><b>Blicket machines</b> work by activating or doing nothing in response to blocks. Some blocks have special properties that make them <b>blickets</b> <span style="display: inline-block;"><Block block={make_dummy_blicket(-1, -1)} is_mini={true} use_transitions="{false}" is_disabled="{true}" /></span>; others are just plain blocks (not blickets) <span style="display: inline-block;"><Block block={make_dummy_nonblicket(-1, -1)} is_mini={true} use_transitions="{false}" is_disabled="{true}" /></span>.
        </p>

        <p>Here's an example of a dummy blicket machine (square with cogs) that you can play with:</p>
        <div class="col-centering-container" style="padding: 0;">
            <TwoPilesAndDetector collection_id="{collection_id}_piles_testable" num_on_blocks_limit="{MAX_NUM_BLOCKS}" is_disabled="{false}" blicket_activation="{(...blickets) => false}" test_button_html="Test the dummy blicket machine<br/><span style='font-size: 0.8rem;'>Note: this dummy machine does not do anything</span>"/>
        </div>
        
        <div>
            <p>How to use:</p>
            <ul style="list-style-type:none;">
                <li><button class="block-button"><Block block={make_dummy_blicket(-1, -1)} is_mini={true} use_transitions="{false}" is_disabled="{true}" /></button> adds blickets to the machine.</li>
                <li><button class="block-button"><Block block={make_dummy_nonblicket(-1, -1)} is_mini={true} use_transitions="{false}" is_disabled="{true}" /></button> adds plain blocks (not blickets) to the machine.</li>
                <li>You can add as many blickets and plain blocks as you like, for a total of <b>at most {MAX_NUM_BLOCKS}</b>.</li>
                <li><button style="min-width: var(--mini-block-length);">
                    Reset
                </button> removes everything from the machine.</li>
                <li><button>Test the dummy blicket machine</button> shows a dummy response from the blicket machine.</li>
            </ul>
        </div>

        <p><b>Real blicket machines</b> will be able to respond to blickets and/or plain blocks by <span style="background: var(--active-color); padding: 0 0.3rem;">activating with a green color</span> or doing nothing. It doesn’t matter where blickets and/or plain blocks are placed on the machine.</p>
        
        <!-- will teach you how different blicket machines work (when the machine <span style="background: var(--active-color); padding: 0 0.3rem;">activates</span> and when it does nothing) by showing you <b>{ordered_fform_keys.length} different sets of examples</b>. Each example set is created by a teacher, who may or may not be confident in knowing how the blicket machine works.</p> -->

        <h3>Learning from a Teacher</h3>
        <p>In this study, a teacher wants to teach you about {Object.keys($quiz_data_dict).length} blicket machines. For each machine, they have created an <b>example set</b> to show you how it works: when it <span style="background: var(--active-color); padding: 0 0.3rem;">activates</span> and when it does nothing. The teacher may or may not be confident in knowing how the machine works.</p>
        <p>In each example set, a teacher has created 5 examples to teach you about how a blicket machine works. For instance, you will see one example set that looks like:</p>
        <TeacherExampleSet collection_prefix="{Object.keys($quiz_data_dict)[0]}" />

        <p>In each example for this blicket machine, <b>the teacher has chosen</b> to put some blickets and/or plain blocks on the machine and show you whether the blicket machine should  <span style="background: var(--active-color); padding: 0 0.3rem;">Activate</span> or "Do Nothing" in response.</p>
        <p><b>Your goal</b> is to describe how this blicket machine works based on the teacher's 5 examples. You will have the chance to practice making a blicket machine description at the bottom of this page.</p>
        <p><b>Your bonus</b> will be determined by whether other people, such as the teacher, think your description is representative of the teacher's examples (up to {$bonus_currency_str}{roundMoney(student_bonus_val)} per example set). Your bonus will be sent within <b>within {short_bonus_time}</b>.</p>
        
        <div bind:this={checking_container} style="border-radius: var(--container-border-radius); box-shadow: var(--container-box-shadow); width=100%; height: 500px; overflow-y: scroll; padding: 10px; margin-top: 3rem;">
            
            <!-- janky 4+page_dex to turn -3, -2, -1 into part 1, 2, 3 respectively -->
            <h3 style="margin: 0">Checking Your Understanding (Part {4+page_dex}/3)</h3>
            <p style="margin: 0;">(This box is scrollable.)</p>
            <hr>
            {#if page_dex === -3}
                <PracticeRule bind:passed="{passed_practice}" />
                <div class="button-container">
                    <button class="abs" on:click="{cont}">Continue</button>
                </div>
                <p class:hide={!show_feedback} class="wrong">Please make sure your description is complete (nothing is marked in red) and correct.</p>
            {:else if page_dex === -2}
                <div in:fade="{{delay: FADE_IN_DELAY_MS, duration: FADE_DURATION_MS}}">
                    {#each Object.keys(qa_dict) as key}
                        <div class="qa-min">
                            <p>{@html qa_dict[key].question}</p>
                            <label><input type="radio" bind:group={qa_dict[key].answer} value={true}>True</label>
                            <label><input type="radio" bind:group={qa_dict[key].answer} value={false}>False</label>
                        </div>
                    {/each}

                <div class="button-container">
                    <button class="abs" on:click="{cont}">Continue</button>
                </div>
                <p class:hide={!show_feedback} class="wrong">Not all answers are correct. Please try again.</p>
                </div>

            {:else if page_dex === -1}
                <div in:fade="{{delay: FADE_IN_DELAY_MS, duration: FADE_DURATION_MS}}">
                    <p style="margin-bottom: 2rem;"><b>To reaffirm that you want to participate in our study, please move only the blocks with warm colors from left to right.</b> You can move blocks by clicking on them. Feel free to google the meaning of warm colors. The button below will then take you to the first blicket machine.</p>

                    <div class="col-centering-container" style="padding: 0;">
                        <CoolWarmCaptcha on:continue bind:passed={passed_captcha}/>
                        
                        <div class="button-container">
                            <!-- translate to center-->
                            <button class="abs" style="transform: translateX(-50%); width: 7rem;" on:click="{cont}">Begin</button>
                        </div>
                        <p class:hide={!show_feedback} class="wrong">Please move only the warm-colored blocks from left to right.</p>
                    </div>
                </div>
            {/if}
        </div>
        
        <button class:hide="{!$dev_mode}" on:click="{() => can_cont = true}">dev: skip validation</button>
        <button class:hide="{!$dev_mode}" on:click="{() => dispatch("continue")}">dev: skip to next page</button>
    </div>
</CenteredCard>

<div class="attribution" in:fade="{{delay: FADE_IN_DELAY_MS, duration: FADE_DURATION_MS}}" out:fade="{{duration: FADE_DURATION_MS}}">
    Cog icon made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08" target="_blank">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">www.flaticon.com</a>
</div>

<!-- honeypot -->
<WinnieThePooh on:continue/>

<style>
    h2 {
        margin: 0.5rem;
    }

    /* minimal qa classes */
    .qa-min {
        margin-top: 1.5rem;
    }
    .qa-min p {
        margin-bottom: 0;
    }

    .wrong {
        color: red;
        margin-bottom: 0;
    }

    /* by using a relative button container and absolute button, we avoid weird overflow/scrolling behavior (e.g. disappearing scrollbar) when the button is translated on press (:active) */
    /* learned from: https://stackoverflow.com/questions/21248111/overflow-behavior-after-using-css3-transform */
    .button-container {
        position: relative;
        display: inline-block;
        height: 3.5rem;  /* acts like a top-margin proxy when the absolutely positioned button has bottom 0 */
    }
    button.abs {
        position: absolute;
        bottom: 0;
        
        margin: 0;
        /* left: 0; */
        /*  */
    }
</style>

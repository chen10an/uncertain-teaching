<script>
    export let passed = false;  // bind to tell parent whether practice has been done correctly
    
    import ForcedChoiceDNFRule from '../partials/ForcedChoiceDNFRule.svelte';
    import { Branch, MAX_NUM_BRANCHES } from '../../modules/rule_classes.js';

    let correct_rule = [new Branch(1, "=", 1, "=", 1)]
    
    // to be bound by ForcedChoiceDNFRule
    let rule_is_done = false;
    let visible_branches = [];
    $: rule = visible_branches.map(x => x.branch);

    function rulesAreEqual(rule1, rule2) {
        if (rule1.length === rule2.length) {
            // has the same number of branches
            for (let i=0; i < rule1.length; i++) {
                for (const key in rule1[i]) {
                    if (rule1[i][key] !== rule2[i][key]) {
                        // doesn't have the same branch values
                        return false;
                    }
                }
            }

            return true;
        } else {
            return false;
        }
    }
    
    // passed of if the rule has been fully filled out and is equal to correct_rule
    $: passed = rule_is_done && rulesAreEqual(rule, correct_rule);
                
</script>

<p style="margin-bottom: 0;"><b>Please practice explaining how the blicket machine works:</b> Suppose that, after seeing a teacher's examples, you think the blicket machine always activates when a single blicket and a single plain block are on the machine. Please explain this by using the dropdowns and buttons below:</p>
<ul style="list-style-type:none;">
    <li><select><option>Dropdowns</option></select> are used to choose words and numbers in your explanation.</li>
    <li><button style="min-width: 3rem;">+</button> adds an "OR" word and makes your explanation longer. You can add up to {MAX_NUM_BRANCHES-1} "OR"s.</li>
    <li><span style="cursor: pointer; color: var(--dark-gray);" >&#10006;</span> removes an "OR" word and makes your explanation shorter.</li>
</ul>
                
<p>Your explanation's words, numbers, and length are <b>scrambled</b> at first, so please use the dropdowns and buttons to modify them into the correct explanation.</p>
<ForcedChoiceDNFRule bind:is_done="{rule_is_done}" bind:visible_branches="{visible_branches}" min_num_branches="{2}" />
<!-- initialize with at least 2 branches so that the participant has to practice removing branches -->

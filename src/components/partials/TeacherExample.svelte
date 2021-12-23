<script>
    // Props
    export let show_positive_detector;  // boolean indicating whether the detector shows a positive response
    export let blicket_nonblicket_combo;  // string for a special kind of combo that shows the blickets ("*") and nonblickets (".") currently on the detector, indexed by the order the teacher placed them on the detector (rather than block id, as used in regular combos)
    export let collection_id;  // components with the same collection id will use the same block objects from block_dict in module/experiment_stores.js

    // Imports
    import { block_dict, make_dummy_blicket, make_dummy_nonblicket, MAX_NUM_BLOCKS} from '../../modules/experiment_stores.js';
    import BlockGrid from './BlockGrid.svelte';

    // Constants:
    // [0..NONBLICKET_START_DEX) in block_dict contains blickets; [NONBLICKET_START_DEX..NON_BLICKET_START_DEX*2) in block_dict contains nonblickets
    const NONBLICKET_START_DEX = MAX_NUM_BLOCKS;
    // there are a total of MAX_NUM_BLOCKS blocks for each blicket/nonblicket pile

    // if they don't exist, create one collection of blocks for blickets AND nonblickets
    if (!(collection_id in $block_dict)) {
        let blicket_pile = []
        let nonblicket_pile = []
        
        for (let i=0; i < NONBLICKET_START_DEX; i++) {
            // visually separate blickets vs nonblickets via different gray-scale colors; the hardcoded color strings need to correspond to css variable names that contain the color
            // one blicket OR one nonblicket can fill a position on the detector (0-8)
            let blicket = make_dummy_blicket(i, i);
            let nonblicket = make_dummy_nonblicket(i+NONBLICKET_START_DEX, i);
            blicket_pile.push(blicket);
            nonblicket_pile.push(nonblicket);
        }
        
        block_dict.update(dict => {
            dict[collection_id] = blicket_pile.concat(nonblicket_pile);
            return dict;
        });
    }
    
    // show teaching examples via setting the corresponding position block states to true
    for (let i = 0; i < blicket_nonblicket_combo.length; i++) {
        let char = blicket_nonblicket_combo.charAt(i);
        if (char === "*") {
            block_dict.update(dict => {
                dict[collection_id][i].on();
                return dict;
            });
        } else if (char === ".") {
            block_dict.update(dict => {
                dict[collection_id][i + NONBLICKET_START_DEX].on();
                return dict;
            });
        } else {
            throw new Error("blicket_nonblicket_combo should contain only '*' and '.' characters");
        }
    }
</script>

<BlockGrid collection_id="{collection_id}" is_mini="{true}" is_disabled="{true}" block_filter_func="{block => block.state}" is_detector="{true}" show_positive="{show_positive_detector}" show_negative="{false}" use_transitions="{false}" use_overlay="{false}" />

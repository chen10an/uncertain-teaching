<script>
    import Router from 'svelte-spa-router';
	  import {wrap} from 'svelte-spa-router/wrap';

	  import ExperimentController from './routes/ExperimentController.svelte';
	  import TestComponent from './components/pages/IntroInstructions.svelte';
	  import TestComponent2 from './components/pages/End.svelte';
	  import { bonus_currency_str, dev_mode } from './modules/experiment_stores.js';

	  import {
        ordered_sess,
        ordered_seq
    } from './condition_configs/all_conditions.js';
    
	  // configure the experiment conditions and bonuses
	  bonus_currency_str.set("£");

	  // TODO: route that doesn't write data (can be turned on/off separately from dev mode)
	  // create routes
	  let routes = {};
	  for (let i=0; i < ordered_sess.length; i++) {
		    routes[`/conditions/${i}`] = wrap({
			      component: ExperimentController,
			      props: {
				        component_sequence: ordered_seq[i],
				        experiment_id: "uncertain_teaching_00x",
				        condition_name: ordered_sess[i],
				        bonus_val_per_q: 0.15,  // value for questions that can be scored automatically; there are only manual scoring questions in this experiment
				        set_dev_mode: false
			      }
		    });

		    routes[`/dev/conditions/${i}`] = wrap({
			      component: ExperimentController,
			      props: {
				        component_sequence: ordered_seq[i],
				        experiment_id: "uncertain_teaching_00x-dev",
				        condition_name: ordered_sess[i],
				        bonus_val_per_q: 0.15,
				        set_dev_mode: true
			      }
		    });
	  }

	  routes["/test"] = wrap({
		    // component: TestComponent,
        // 		    conditions: [
        //     // hack: use pre-condition to activate dev_mode
        //     (detail) => {
        // 				        dev_mode.set(true);
        // 				        return dev_mode;
        //     },
        // ]
        component: ExperimentController,
			  props: {
				    component_sequence: ordered_seq[0],
				    experiment_id: "uncertain_teaching_00x-dev",
				    condition_name: ordered_sess[0],
				    bonus_val_per_q: 0.15,
				    set_dev_mode: true
			  }
	  });

    routes["/test2"] = wrap({
		    component: TestComponent2,
		    conditions: [
            // hack: use pre-condition to activate dev_mode
            (detail) => {
				        dev_mode.set(true);
				        return dev_mode;
            },
        ]
	  });

	  // TODO: implement different wrapper component for different platforms: reddit sample size, mturk and prolific
</script>

<Router {routes}/>


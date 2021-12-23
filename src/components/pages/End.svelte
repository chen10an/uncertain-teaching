<script>
    export let is_trouble = false;
    export let chunk_error = null;

    import { short_bonus_time } from '../../condition_configs/all_conditions.js';   
    
    import CenteredCard from '../partials/CenteredCard.svelte';
</script>

{#if is_trouble}
    <CenteredCard has_button={false} is_large={true}>
        <h3 style="color: red;">We're sorry that the study can no longer be completed. Please return this HIT, thank you.</h3>

        <p>This is because too many unsuccessful "continue"/"begin" button presses were attempted on the "checking your understanding" part of the instructions page. But please feel free to message us on Prolific or <a href="mailto:cocosci_support@mlist.is.ed.ac.uk">email us</a> if you feel we have mischaracterized your button presses and we will do our best to help you.</p>
    </CenteredCard>
{:else if chunk_error}
    <CenteredCard has_button={false} is_large={true}>
        <h3 style="color: red;">It looks like we are unable to collect your participation data. Please message us about this issue.</h3>

        <p>Thank you for participating! Unfortunately, we're having some technical issues that are preventing us from collecting your participation data. This is detrimental to our research, so we would be very grateful if you could let us know by <b>messaging us on Prolific or sending an email to <a href="mailto:cocosci_support@mlist.is.ed.ac.uk">cocosci_support@mlist.is.ed.ac.uk</a> with the following error message:</b></p>
        <p>{@html chunk_error}</p>
        <p>Thank you in advance!</p>
    </CenteredCard>
{:else}
    <CenteredCard has_button={false}>
        <h3 style="margin-bottom: 0">Thank you for participating!</h3>
        <p>Your blicket machine descriptions will be shown to other people, such as the teacher, and your bonus will be determined by whether they think your descriptions are representative of the teacher's examples. Your bonus will be sent <b>within {short_bonus_time}</b>.</p>
        
        <p style="margin-top: 0;">To complete this Prolific study, <a href="https://app.prolific.co/submissions/complete?cc=2FA486A9" target="_blank">please click here</a>.</p>
        <img src="/images/thankyou.jpg" alt="dog biting a thank you card">
        <span class="attribution"><br/>Photo by <a href="https://unsplash.com/@howier?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank">Howie R</a> on <a href="https://unsplash.com/s/photos/thank-you?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank">Unsplash</a></span>

    </CenteredCard>
{/if}

<style>
    img {
        width: 17rem;
    }
</style>

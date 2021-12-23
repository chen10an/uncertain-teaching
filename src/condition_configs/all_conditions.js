// this file specifies the experiment conditions as well as any one-off variables that are needed for a specific experiment version but will not necessarily generalize to future versions (e.g., long_bonus_time and teaching_bonus_val in 2.x.x)

export const short_bonus_time = "2 working days";  // max time for receiving auto-calculated bonus

export const student_bonus_val = 0.15;

export const qa_dict = {
    "blicket": {"question": `Blickets are marked with a star, while plain blocks are not.`, "correct_answer": true},
    "position": {"question": "When a blicket or plain block is on the blicket machine, its <em>position</em> can influence whether the machine activates.", "correct_answer": false},
    "same": {"question": "All of the teacher's example sets are about the same blicket machine.", "correct_answer": false},
    "confidence": {"question": "The teacher is always confident about how the machine works.", "correct_answer": false},
    "teaching": {"question": `When you make a blicket machine description, the description's words, numbers, and length are scrambled at first, so your goal is to modify them into the correct description.`, "correct_answer": true},
};

// OBS: there should only be one teacher/session id per condition so that the collection ids are unique within that condition
const teacher_to_collection_to_ex = {
    "y048Xdw4VumCkDB5QKW8HQg0eTMOfxZN": {
        "noisy_conj3": "**** +, *** +, *** -, ** -, * -",
        "disj": "* +,	*** +, ***** +,	.. -,	...** +",
        "noisy_conj": "** +, ** -, *** +, * -, ** +",
        "conj3": "*** +, ** -, **** +, * -, ***... +",
        "noisy_disj": "* +, * +, * -, ** +, ... -",
        "conj": "** +, *** +, * -, **.. +, **** +",
        "participant": "**. +, **.. -, *.. -, *** +, ***... -",
        "participant_form": "If there are more blickets than regular blocks, it activates"
    }
}

// turn each string into an example object with keys "blicket_nonblicket_combo" and "detector_state"
for (const sess in teacher_to_collection_to_ex) {
    for (const coll in teacher_to_collection_to_ex[sess]) {
        if (coll === "participant_form") {
            // don't process this one
            continue;
        }
        
        let str = teacher_to_collection_to_ex[sess][coll];
        let split_str = str.split(",").map(x => x.trim());
        
        teacher_to_collection_to_ex[sess][coll] = split_str.map(x => {return {"blicket_nonblicket_combo": x.split(" ")[0], "detector_state": x.split(" ")[1] === "+"}});
    }
}

export { teacher_to_collection_to_ex }

export const sess0 = 'y048Xdw4VumCkDB5QKW8HQg0eTMOfxZN';
export const seq0 = {
    "PIS": {},
    "IntroInstructions": {collection_id: "intro"},
    "Quiz_0": {collection_id: "noisy_conj3", quiz_dex: 0},
    "Quiz_1": {collection_id: "disj", quiz_dex: 1},
    "Quiz_2": {collection_id: "noisy_conj", quiz_dex: 2},
    "Quiz_3": {collection_id: "conj3", quiz_dex: 3},
    "Quiz_4": {collection_id: "noisy_disj", quiz_dex: 4},
    "Quiz_5": {collection_id: "conj", quiz_dex: 5},
    "Quiz_6": {collection_id: "participant", quiz_dex: 6},
    "End": {code_suffix: "0"}
}

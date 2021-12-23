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

// latin square used the teacher/micro experiment
const row0 = ["disj", "noisy_conj", "conj3", "noisy_disj", "conj", "noisy_conj3", "participant"]
const row1 = ["noisy_conj3", "disj", "noisy_conj", "conj3", "noisy_disj", "conj", "participant"]
const row2 = ["conj", "noisy_conj3", "disj", "noisy_conj", "conj3", "noisy_disj", "participant"]
const row3 = ["noisy_disj", "conj", "noisy_conj3", "disj", "noisy_conj", "conj3", "participant"]
const row4 = ["conj3", "noisy_disj", "conj", "noisy_conj3", "disj", "noisy_conj", "participant"]
const row5 = ["noisy_conj", "conj3", "noisy_disj", "conj", "noisy_conj3", "disj", "participant"]

const teacher_to_order = {
    "y048Xdw4VumCkDB5QKW8HQg0eTMOfxZN": row1,
    "riTbSllW2xXpPjfBLEBnWgrBbKHUiBe3": row0,
    "dIerBQJvFeIIG3UzvWRfGLJ9dpkL4Gqp": row1,
    "cEAwScqcO063kmzLn12Env9oCHPf30jl": row3,
    "YuhNX6Ux6MrxVGPyA4DBEbKAdEhdPGnB": row4
};

// OBS: there should only be one teacher/session id per condition so that the collection ids are unique within that condition
let teacher_to_collection_to_ex = {
    "y048Xdw4VumCkDB5QKW8HQg0eTMOfxZN": {
        "noisy_conj3": "**** +,*** +,*** -,** -,* -",
        "disj": "* +,	*** +,***** +,.. -,...** +",
        "noisy_conj": "** +,** -,*** +,* -,** +",
        "conj3": "*** +,** -,**** +,* -,***... +",
        "noisy_disj": "* +,* +,* -,** +,... -",
        "conj": "** +,*** +,* -,**.. +,**** +",
        "participant": "**. +,**.. -,*.. -,*** +,***... -",
        "participant_form": "If there are more blickets than regular blocks, it activates"
    },
    "riTbSllW2xXpPjfBLEBnWgrBbKHUiBe3": {
        "disj": "*..... +,...... -,**.... +,***... +,****.. +",
        "noisy_conj": "***... +,**.... -,****** +,****.. +,*****. +",
        "conj3": "...... -,....** -,*..... -,***... +,****** +",
        "noisy_disj": "...... -,**.... +,*..... -,***... +,****.. +",
        "conj": "**.... +,*..... -,***... +,...... -,****** +",
        "noisy_conj3": "***... -,****.. +,*****. +,****** +,**.... -",
        "participant": "**.... +,*..... +,...... -,***... -,****** -",
        "participant_form": "Blinket Machine G works with maximum 2 blinkets."
    },
    "dIerBQJvFeIIG3UzvWRfGLJ9dpkL4Gqp": {
        "noisy_conj3": "**** +,...* -,**.. -,*.*. -,.*** +",
        "disj": "*** +,*.*. +,**.. +,* +,.... -",
        "noisy_conj": "*** +,*.*.* +,***. +,.*.*.* +,**... -",
        "conj3": "*** +,*.*.*. +,***. +,***** +,**..* +",
        "noisy_disj": "*.. -,**.. +,*.*. +,..*.* +,..** +",
        "conj": "** +,*.. -,..** +,.*.*.* +,**. +",
        "participant": "*.*. +,.** +,..** +,.*.*. +,**** -",
        "participant_form": "At least the machine has 2 blickets and 1 plain block is a must."
    },
    "cEAwScqcO063kmzLn12Env9oCHPf30jl": {
        "noisy_disj": "* +,* -,** +,**.. +,**.... +",
        "conj": "****** +,** +,*** +,**** +,***** +",
        "noisy_conj3": "**** +,***** +,****** +,*** +,*** -",
        "disj": "* +,** +,*** +,**** +,***** +",
        "noisy_conj": "*** +,**** +,***** +,** -,** +",
        "conj3": "*** +,**** +,***** +,****** +,** -",
        "participant": "*. +,*.. -,**.. +,** -,***... +",
        "participant_form": "Blicket machine G works with an equal number of blickets and plain blocks"
    },
    "YuhNX6Ux6MrxVGPyA4DBEbKAdEhdPGnB": {
        "conj3": "***... +,**.... -,*..... -,****.. +,*****. +",
        "noisy_disj": "* +,* -,** +,**.... +,****** +",
        "conj": "* -,** +,**. +,***... +,****.. +",
        "noisy_conj3": "***... +,***... -,****.. +,*..... -,**.... -",
        "disj": "* +,** +,*** +,...... -,*..... +",
        "noisy_conj": "** +,** -,*** +,***... +,****** +",
        "participant": "** +,**** +,*** -,**.... +,****.. +",
        "participant_form": "Blicket Machine G activates only when 2 or 4 blinkers are inside the machine. It doesn\'t matter if there are blocks inside or not."
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
        console.assert(split_str.length === 5);
        
        teacher_to_collection_to_ex[sess][coll] = split_str.map(x => {return {"blicket_nonblicket_combo": x.split(" ")[0], "detector_state": x.split(" ")[1] === "+"}});
    }
}

export { teacher_to_collection_to_ex }

export const ordered_sess = ["y048Xdw4VumCkDB5QKW8HQg0eTMOfxZN", "riTbSllW2xXpPjfBLEBnWgrBbKHUiBe3", "dIerBQJvFeIIG3UzvWRfGLJ9dpkL4Gqp", "cEAwScqcO063kmzLn12Env9oCHPf30jl", "YuhNX6Ux6MrxVGPyA4DBEbKAdEhdPGnB"]

let ordered_seq = [];
for (let i=0; i < ordered_sess.length; i++) {
    let ordered_collections = teacher_to_order[ordered_sess[i]];
    let seq = {};
    for (let j=0; j < ordered_collections.length; j++) {
        let coll = ordered_collections[j];
        
        if (coll === "participant_form") {
            continue;
        }

        seq[`Quiz_${j}`] = {collection_id: coll, quiz_dex: j};
    }

    let beg = {
        "PIS": {},
        "IntroInstructions": {collection_id: "intro"}
    };
    let end = {"End": {}};
    
    ordered_seq.push({
        ...beg,
        ...seq,
        ...end
    });
}

export { ordered_seq }

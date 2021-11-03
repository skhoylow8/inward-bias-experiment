// ######## ##     ## ########  ########
// ##        ##   ##  ##     ##    ##
// ##         ## ##   ##     ##    ##
// ######      ###    ########     ##
// ##         ## ##   ##           ##
// ##        ##   ##  ##           ##
// ######## ##     ## ##           ##

// data saving
const FORMAL = false;
const EXPERIMENT_NAME = 'inward-bias';
const PLEDGE_CHECK_SCRIPT = 'php/pledge_check.php';
const PLEDGE_RECORD_SCRIPT = 'php/pledge_record.php';
const SUBJ_NUM_SCRIPT = 'php/subjNum.php';
const SAVING_SCRIPT = 'php/save.php';
const VISIT_FILE = 'visit_' + EXPERIMENT_NAME + '.txt';
const PLEDGE_FILE = 'pledge_' + EXPERIMENT_NAME + '.txt';
const SUBJ_NUM_FILE = 'subjNum_' + EXPERIMENT_NAME + '.txt';
const ATTRITION_FILE = 'attrition_' + EXPERIMENT_NAME + '.txt';
const TRIAL_FILE = 'trial_' + EXPERIMENT_NAME + '.txt';
const SUBJ_FILE = 'subj_' + EXPERIMENT_NAME + '.txt';
const SAVING_DIR = FORMAL ? '../data/formal':'../data/testing';
const ID_GET_VARIABLE_NAME = 'sonacode'; //'PROLIFIC_PID';
const FREE_PASS_ID = '1234'; // this is used for testing so this id will always have future access regardless of pledge responses

// stimuli
const STIM_PATH = 'media/';
const TRIAL_PRACTICE_LIST = [{'backgroundImage': 'background/grassfield_adjusted.png', 'stimuli': 'prac.png'}];
const PRACTICE_TRIAL_N = TRIAL_PRACTICE_LIST.length;
const IMAGES = [
    ['averted_gaze/CC_L2_small.png', 'left'],
    ['averted_gaze/CC_R2_small.png', 'right'],
    ['averted_gaze/YC_L2_small.png', 'left'],
    ['averted_gaze/YC_R2_small.png', 'right'],
    ['chair/Chair_L_small.png', 'left'],
    ['chair/Chair_R_small.png', 'right'],
];
const BACKGROUND_IMAGES = [
    'background/grassfield_adjusted.png',
    'background/sea_adjusted.png'
];
const TRIAL_LIST = GENERATE_TRIAL_LIST(IMAGES, BACKGROUND_IMAGES)
const TRIAL_IMG_LIST = SHUFFLE_ARRAY(TRIAL_LIST);
const TRIAL_N = TRIAL_IMG_LIST.length;
const INSTR_TRIAL_N = PRACTICE_TRIAL_N + TRIAL_N;
const INTERTRIAL_INTERVAL = 0.5;
const INSTR_IMG_LIST = ['maximize_window.png'];
const ALL_IMG_LIST = TRIAL_PRACTICE_LIST.concat(TRIAL_LIST).concat(INSTR_IMG_LIST);
let IMAGE_ORIGINAL_POS_X = 0;

// object variables
var instr, subj, trial;

// criteria
const VIEWPORT_MIN_W = 800;
const VIEWPORT_MIN_H = 600;
const INSTR_READING_TIME_MIN = 0.75;

// constants
const FRAME_WIDTH = 675;
const FRAME_HEIGHT = 300;

$(document).ready(()=>{
    subj = new subjObject(subj_options);
    subj.id = subj.getID(ID_GET_VARIABLE_NAME);
    subj.saveVisit();
    console.log(subj);
    if (subj.phone) {
        HALT_EXPERIMENT('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at yichiachen@ucla.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
    } else if (subj.valid_id){
        LOAD_IMG(0, STIM_PATH, ALL_IMG_LIST, function() {});
        instr = new instrObject(instr_options);
        trial_options['subj'] = subj;
        trial = new trialObject(trial_options);
        instr.start();
    }

    function HALT_EXPERIMENT(explanation) {
        $('.page-box').hide();
        $('#instr-text').html(explanation);
        $('#next-button').hide();
        $('#instr-box').show();
    }
});

//  ######  ##     ## ########        ## ########  ######  ########
// ##    ## ##     ## ##     ##       ## ##       ##    ##    ##
// ##       ##     ## ##     ##       ## ##       ##          ##
//  ######  ##     ## ########        ## ######   ##          ##
//       ## ##     ## ##     ## ##    ## ##       ##          ##
// ##    ## ##     ## ##     ## ##    ## ##       ##    ##    ##
//  ######   #######  ########   ######  ########  ######     ##

const SUBJ_TITLES = [
    'num',
    'date',
    'startTime',
    'id',
    'userAgent',
    'endTime',
    'duration',
    'quizAttemptN',
    'instrReadingTimes',
    'quickReadingPageN',
    'hiddenCount',
    'hiddenDurations',
    'aqResponses',
    'aqRt',
    'serious',
    'problems',
    'gender',
    'age',
    'inView',
    'viewportW',
    'viewportH'
];

// function SEARCH_PLEDGE() {
//     if (subj.id == FREE_PASS_ID) {
//         $('#pledge-box').show();
//     } else {
//         console.log("POST_DATA ----> SEARCH_PLEDGE()");
//         // POST_DATA(PLEDGE_CHECK_SCRIPT, { 'directory_path': SAVING_DIR, 'file_name': PLEDGE_FILE, 'worker_id': subj.id}, CHECK_PLEDGE, AJAX_FAILED);
//     }
// }

// function CHECK_PLEDGE(found) {
//     if (found == '0') {
//         $('#pledge-box').show();
//     } else {
//         HALT_EXPERIMENT('It seems that you have reported that you will not read the instructions carefully before. In that case, you will not be fully informed and thus we are not allowed to let you participate because of the ethical concerns.<br /><br />If you believe you have received this message in error, please contact the experimenter at XXX@ucla.edu. Otherwise, please return the task.');
//     }
// }

// function SUBMIT_PLEDGE_Q() {
//     const RESP = $('input[name="pledge"]:checked').val();
//     if (CHECK_IF_RESPONDED([], [RESP])) {
//         $('#pledge-box').hide();
//         if (RESP == 1){
//             ACCEPT_PLEDGE();
//         } else {
//             REFUSE_PLEDGE();
//         }
//     } else {
//         $('#pledge-warning').text('Please answer the question to start the experiment. Thank you!');
//     }
// }

// function ACCEPT_PLEDGE() {
//     instr = new instrObject(instr_options);
//     trial_options['subj'] = subj;
//     trial = new trialObject(trial_options);
//     instr.start();
// }

// function REFUSE_PLEDGE() {
//     console.log("POST_DATA ----> REFUSE_PLEDGE()");
//     // POST_DATA(PLEDGE_RECORD_SCRIPT, { 'directory_path': SAVING_DIR, 'file_name': PLEDGE_FILE, 'worker_id': subj.id});
//     HALT_EXPERIMENT('It seems that you have reported that you will not read the instructions carefully. In that case, you will not be fully informed and thus we are not allowed to let you participate because of the ethical concerns.<br /><br /> We are sorry that we have to ask you to return the task.');
// }

function UPDATE_TRIAL_OBJECT_SUBJ_NUM() {
    if (typeof trial !== 'undefined'){
        trial.num = subj.num;
    }
}

function HANDLE_VISIBILITY_CHANGE() {
    if (document.hidden) {
        subj.hiddenCount += 1;
        subj.hiddenStartTime = Date.now();
    } else  {
        subj.hiddenDurations.push((Date.now() - subj.hiddenStartTime)/1000);
    }
}

function SUBMIT_DEBRIEFING_Q() {
    subj.serious = $('input[name=serious]:checked').val();
    if(!CHECK_IF_RESPONDED([], [subj.serious])){
        $('#serious-warning').text('Please answer this question to complete the experiment. Thank you!');
        $('#serious-warning').css('display', 'block');
    }else{
        $('#serious-warning').css('display', 'none');
    }

    subj.problems = $('#problems').val();
    if(!CHECK_IF_RESPONDED([subj.problems], [])){
        $('#procedure-warning').text('Please answer this question to complete the experiment. Thank you!');
        $('#procedure-warning').css('display', 'block');
    }else{
        $('#procedure-warning').css('display', 'none');
    }

    subj.gender = $('input[name=gender]:checked').val();
    if(!CHECK_IF_RESPONDED([], [subj.gender])){
        $('#gender-warning').text('Please answer this question to complete the experiment. Thank you!');
        $('#gender-warning').css('display', 'block');
    }else{
        $('#gender-warning').css('display', 'none');
    }

    subj.age = $('#age').val();
    if(!CHECK_IF_RESPONDED([subj.age], []) || (subj.age > 80)){
        $('#age-warning').text('Please answer this question to complete the experiment. Thank you!');
        $('#age-warning').css('display', 'block');
    }else{
        $('#age-warning').css('display', 'none');
    }
    
    const OPEN_ENDED_LIST = [subj.problems, subj.age];
    const OPEN_ENDED_ATTRIBUTE_NAMES = ['problems', 'age'];
    const CHOICE_LIST = [subj.serious, subj.gender];
    const ALL_RESPONDED = CHECK_IF_RESPONDED(OPEN_ENDED_LIST, CHOICE_LIST);
    if (ALL_RESPONDED) {
        for (var i = 0; i < OPEN_ENDED_LIST.length; i++) {
            subj[OPEN_ENDED_ATTRIBUTE_NAMES[i]] = subj[OPEN_ENDED_ATTRIBUTE_NAMES[i]].replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        subj.quizAttemptN = instr.quizAttemptN['onlyQ'];
        subj.instrReadingTimes = JSON.stringify(instr.readingTimes);
        subj.quickReadingPageN = Object.values(instr.readingTimes).filter(d => d < INSTR_READING_TIME_MIN).length;
        subj.aqResponses = JSON.stringify(subj.aqResponses);
        subj.aqRt = JSON.stringify(subj.aqRt);
        subj.submitQ();
        $('#questions-box').hide();
        ALLOW_SELECTION();
        $('#debriefing-box').show();
        $('body').scrollTop(0);
    }
}

function ALLOW_SELECTION() {
    $('body').css({
        '-webkit-user-select':'text',
        '-moz-user-select':'text',
        '-ms-user-select':'text',
        'user-select':'text'
    });
}

function END_SONA() {
    console.log("End to sona!");
    $("#debriefing-box").hide();
    // window.location.href = 'https://app.prolific.co/submissions/complete?cc=XXX'; // link provided by Prolific
}

function AJAX_FAILED() {
    HALT_EXPERIMENT('Oops! An error has occurred. Please submit with the code "AJAX_ERR". Sorry!');
}

var subj_options = {
    titles: SUBJ_TITLES,
    viewportMinW: VIEWPORT_MIN_W,
    viewportMinH: VIEWPORT_MIN_H,
    subjNumCallback: UPDATE_TRIAL_OBJECT_SUBJ_NUM,
    //subjNumScript: SUBJ_NUM_SCRIPT,
    //savingScript: SAVING_SCRIPT,
    //subjNumFile: SUBJ_NUM_FILE,
    //visitFile: VISIT_FILE,
    //attritionFile: ATTRITION_FILE,
    //subjFile: SUBJ_FILE,
    //savingDir: SAVING_DIR,
    handleVisibilityChange: HANDLE_VISIBILITY_CHANGE
};

// #### ##    ##  ######  ######## ########
//  ##  ###   ## ##    ##    ##    ##     ##
//  ##  ####  ## ##          ##    ##     ##
//  ##  ## ## ##  ######     ##    ########
//  ##  ##  ####       ##    ##    ##   ##
//  ##  ##   ### ##    ##    ##    ##    ##
// #### ##    ##  ######     ##    ##     ##

const MAIN_INSTRUCTIONS_DICT = [
    [false, false, 'Thank you very much!<br /><br />This study will take about 20 minutes. Please read the instructions carefully, and avoid using the refresh or back buttons.'],
    [SHOW_MAXIMIZE_WINDOW, false, 'Now, please maximize your browser window.'],
    [HIDE_INSTR_IMG, false, 'This study consists of two parts.'],
    [false, false, 'In the first part you will be presented with an image in a frame. Your task is to move the image either to the left or to the right until it is in a position that looks pleasing to you.'],
    [false, false, 'For this first part you will first be presented ' + PRACTICE_TRIAL_N +' practice trial and then a total of ' + TRIAL_N + ' formal trials.'],
    [false, false, 'In the second part you will be presented with statements in which you have to decide if you Strongly Disagree, Slightly Disagree, Slightly Agree, or Strongly Agree with them.'],
    [false, false, "The next page is a quick instruction quiz. (It's very simple!)"],
    [false, SHOW_INSTR_QUESTION, ''],
    [SHOW_CONSENT, false, "Great! You can press SPACE to start. Please focus after you start (e.g., don't switch to other windows or tabs!)"]
];

function SHOW_INSTR_IMG(file_name) {
    $('#instr-img').attr('src', STIM_PATH + file_name);
    $('#instr-img').css('display', 'block');
}

function HIDE_INSTR_IMG() {
    $('#instr-img').css('display', 'none');
}

function SHOW_MAXIMIZE_WINDOW() {
    SHOW_INSTR_IMG('maximize_window.png');
}

function SHOW_INSTR_QUESTION() {
    $('#instr-box').hide();
    $('#quiz-box').show();
}

function SUBMIT_INSTR_Q() {
    const CHOICE = $('input[name="quiz"]:checked').val();
    if (typeof CHOICE === 'undefined') {
        $('#quiz-warning').text('Please answer the question. Thank you!');
    } else if (CHOICE != 'option1') {
        instr.quizAttemptN['onlyQ'] += 1;
        instr.saveReadingTime();
        $('#instr-text').text('You have given an incorrect answer. Please read the instructions again carefully.');
        $('#instr-box').show();
        $('#quiz-box').hide();
        $('input[name="quiz"]:checked').prop('checked', false);
        instr.index = -1;
    } else {
        instr.saveReadingTime();
        instr.next();
        $('#quiz-box').hide();
        $('#instr-box').show();
    }
}

function SHOW_CONSENT() {
    $('#next-button').hide();
    $('#consent-box').show();
    $(document).keyup(function(e) {
        if (e.key == ' ') {
            $(document).off('keyup');
            instr.saveReadingTime();
            $('#instr-box').hide();
            subj.saveAttrition();
            SHOW_TRIAL();
        }
    });
}

var instr_options = {
    textBox: $('#instr-box'),
    textElement: $('#instr-text'),
    dict: MAIN_INSTRUCTIONS_DICT,
    quizConditions: ['onlyQ']
};


// ########    ###     ######  ##    ##
//    ##      ## ##   ##    ## ##   ##
//    ##     ##   ##  ##       ##  ##
//    ##    ##     ##  ######  #####
//    ##    #########       ## ##  ##
//    ##    ##     ## ##    ## ##   ##
//    ##    ##     ##  ######  ##    ##

const TRIAL_TITLES = [
    "num",
    "date",
    "subjStartTime",
    "trialNum",
    "facingDir",
    "stimName",
    "background",
    "inView",
    "imagAdj", 
    "rt"
];

function SHOW_TRIAL() {
    $('#task-box').show();
    subj.detectVisibilityStart();
    trial.run();
}

function TRIAL_UPDATE(formal_trial, last, this_trial, next_trial, path) {
    $('#trial-progress').text(trial.progress);
    $('#expBut').hide()
    IMAGE_ORIGINAL_POS_X = $("#testImg").position().left;

    trial.stimName = this_trial.stimuli;
    trial.background = this_trial.backgroundImage;
    trial.facingDir = this_trial.direction;

    $('#test-frame').css("background-image", "url(" + path + this_trial.backgroundImage + ")");
    $("#testImg").attr("src", path + this_trial.stimuli);
    $("#testImg").on('load', function() {
        $("#testImg").css('left', (FRAME_WIDTH/2)-(this.naturalWidth/2));
    });
    $('#testImg').click(ADJUST_IMAGE);

    if(!last){
        $("#buffer-frame").css("background-image", "url("+ path + next_trial.backgroundImage+")");
        $("#bufferImg").attr("src", path + next_trial.stimuli);
    }
    
    // Make image draggable
    $("#testImg").draggable({
        containment: 'parent',
        axis: 'x',
    });
}

const ADJUST_IMAGE = () =>{ 
    let imagePosX = $("#testImg").position().left;
    trial.imagAdj = imagePosX - IMAGE_ORIGINAL_POS_X;
    $('#expBut').show();
}

function TRIAL() {
    $("#test-frame").show();
    trial.inView = CHECK_FULLY_IN_VIEW($("#testImg"));
}

function END_TRIAL() {
    $("#test-frame").hide();
    $("#expBut").hide();
    trial.end();
}

function END_EXPT() {
    $("#trial-page").hide();
    $("#expBut").hide();
    trial.save();
    $("#aqBox").css("display", "block");
    $(document).keyup(function(e) {
        if (e.which == 32) { // the 'space' key
            $(document).off("keyup");
            START_AQ();
        }
    });
}

var trial_options = {
    titles: TRIAL_TITLES,
    pracTrialN: PRACTICE_TRIAL_N,
    trialN: TRIAL_N,
    //savingScript: SAVING_SCRIPT,
    //dataFile: TRIAL_FILE,
    //stimPath: STIM_PATH,
    //savingDir: SAVING_DIR,
    trialList: TRIAL_IMG_LIST,
    pracList: TRIAL_PRACTICE_LIST,
    intertrialInterval: INTERTRIAL_INTERVAL,
    updateFunc: TRIAL_UPDATE,
    trialFunc: TRIAL,
    endExptFunc: END_EXPT,
    progressInfo: true
};

/*
    #     #####  
   # #   #     # 
  #   #  #     # 
 #     # #     # 
 ####### #   # # 
 #     # #    #  
 #     #  #### # 
                 
*/

function START_AQ() {
    $("#aqInstrText").hide();
    subj.aqResponses  = {};
    subj.aqRt  = {};
    subj.aqNowQ = 1;
    startTime = Date.now();
    $("#aqQ").text(AQ_QUESTION_DICT[1]);
    $("#aqContainer").show();
}

function AQ_RESPONSE(event) {
    const RESP = event.target.value;

    subj.aqResponses[subj.aqNowQ] = RESP;
    const currentTime = Date.now();
    subj.aqRt[subj.aqNowQ] = (currentTime - startTime) / 1000;
    if (subj.aqNowQ == AQ_LENGTH){
        console.log(subj.aqResponses);
        $("#aqBox").hide();
        $("#questions-box").show();
        subj.detectVisibilityEnd();
    } else {
        subj.aqNowQ += 1;
        $("#aqQ").text(AQ_QUESTION_DICT[subj.aqNowQ]);
        $("#aqProgress").text( Math.round(100 * subj.aqNowQ / (AQ_LENGTH+2)) );
        $('#aq-warning').text('');
        $("input[type=radio][name=rating]").prop('checked', false);
    }
}

// AQ variables
const AQ_QUESTION_DICT = {
    1: "I prefer to do things with others rather than on my own.",
    2: "I prefer to do things the same way over and over again.",
    3: "If I try to imagine something, I find it very easy to create a picture in my mind.",
    4: "I frequently get so strongly absorbed in one thing that I lose sight of other things.",
    5: "I often notice small sounds when others do not.",
    6: "I usually notice car number plates or similar strings of information.",
    7: "Other people frequently tell me that what I've said is impolite, even though I think it is polite.",
    8: "When I'm reading a story, I can easily imagine what the characters might look like.",
    9: "I am fascinated by dates (calendar dates).",
    10: "In a social group, I can easily keep track of several different people's conversations.",
    11: "I find social situations easy.",
    12: "I tend to notice details that others do not.",
    13: "I would rather go to a library than to a party.",
    14: "I find making up stories easy.",
    15: "I find myself drawn more strongly to people than to things.",
    16: "I tend to have very strong interests, which I get upset about if I can't pursue.",
    17: "I enjoy social chitchat.",
    18: "When I talk, it isn't always easy for others to get a word in edgewise.", //SSS
    19: "I am fascinated by numbers.",
    20: "When I'm reading a story, I find it difficult to work out the characters' intentions.",
    21: "I don't particularly enjoy reading fiction.",
    22: "I find it hard to make new friends.",
    23: "I notice patterns in things all the time.",
    24: "I would rather go to the theater than to a museum.",
    25: "It does not upset me if my daily routine is disturbed.",
    26: "I frequently find that I don't know how to keep a conversation going.",
    27: 'I find it easy to "read between the lines" when someone is talking to me.',
    28: "I usually concentrate more on the whole picture, rather than on the small details.",
    29: "I am not very good at remembering phone numbers.",
    30: "I don't usually notice small changes in a situation or a person's appearance.",
    31: "I know how to tell if someone listening to me is getting bored.",
    32: "I find it easy to do more than one thing at once.",
    33: "When I talk on the phone, I'm not sure when it's my turn to speak.",
    34: "I enjoy doing things spontaneously.",
    35: "I am often the last to understand the point of a joke.",
    36: "I find it easy to work out what someone is thinking or feeling just by looking at their face.",
    37: "If there is an interruption, I can switch back to what I was doing very quickly.",
    38: "I am good at social chitchat.",
    39: "People often tell me that I keep going on and on about the same thing.",
    40: "When I was young, I used to enjoy playing games involving pretending with other children.",
    41: "I like to collect information about categories of things (e.g., types of cars, birds, trains, plants, etc.).",
    42: "I find it difficult to imagine what it would be like to be someone else.",
    43: "I like to plan any activities I participate in carefully.",
    44: "I enjoy social occasions.",
    45: "I find it difficult to work out people's intentions.",
    46: "New situations make me anxious.",
    47: "I enjoy meeting new people.",
    48: "I am a good diplomat.",
    49: "I am not very good at remembering people's dates of birth.",
    50: "I find it very easy to play games with children that involve pretending."
};
const AQ_LENGTH = Object.keys(AQ_QUESTION_DICT).length;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
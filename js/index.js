let frameOriginalPosX = 0;
let imageOriginalPosX = 0;
let imageDifference;
const path = 'media/'
let trialNum = 0;
let trialList = [
    {
        'backgroundImage': 'background/grassfield_adjusted.png',
        'stimuli': 'averted_gaze/CC_L2_small.png'
    },
    {
        'backgroundImage': 'background/grassfield_adjusted.png',
        'stimuli': 'averted_gaze/CC_R2_small.png'
    },
    {
        'backgroundImage': 'background/grassfield_adjusted.png',
        'stimuli': 'averted_gaze/YC_L2_small.png'
    },
    {
        'backgroundImage': 'background/grassfield_adjusted.png',
        'stimuli': 'averted_gaze/YC_R2_small.png'
    },
    {
        'backgroundImage': 'background/grassfield_adjusted.png',
        'stimuli': 'chair/Chair_L_small.png'
    },
    {
        'backgroundImage': 'background/grassfield_adjusted.png',
        'stimuli': 'chair/Chair_R_small.png'
    },
    {
        'backgroundImage': 'background/sea_adjusted.png',
        'stimuli': 'averted_gaze/CC_L2_small.png'
    },
    {
        'backgroundImage': 'background/sea_adjusted.png',
        'stimuli': 'averted_gaze/CC_R2_small.png'
    },
    {
        'backgroundImage': 'background/sea_adjusted.png',
        'stimuli': 'averted_gaze/YC_L2_small.png'
    },
    {
        'backgroundImage': 'background/sea_adjusted.png',
        'stimuli': 'averted_gaze/YC_R2_small.png'
    },
    {
        'backgroundImage': 'background/sea_adjusted.png',
        'stimuli': 'chair/Chair_L_small.png'
    },
    {
        'backgroundImage': 'background/sea_adjusted.png',
        'stimuli': 'chair/Chair_R_small.png'
    }
]
let trialData = []
let finalData = []

$(document).ready(()=>{
    // $("#instrPage").css('display', 'block')
})

const shuffleTrial = (input_array) =>{ //funtion not working properly
    var j, temp;
    var arr = Array.from(input_array);
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

const runTrials = () => {
    $("#expBut").hide() //hide next button until user moves image

    let shuffledTrialList = shuffleTrial(trialList)
    console.log(shuffledTrialList, trialList)

    if(trialNum < shuffledTrialList.length){
        let data = shuffledTrialList[trialNum]
        let background = data.backgroundImage
        let stimuli = data.stimuli
        
        $("#testFrame").css("background-image", "url(" + path + background + ")")
        $("#testImg").attr("src", path + stimuli);
        $("#testImg").css('left', '260px')

        if(trialNum+1 < shuffledTrialList.length){
            $("#bufferFrame").css("background-image", "url("+ path + shuffledTrialList[trialNum+1].backgroundImage+")");
            $("#bufferImg").attr("src", path + shuffledTrialList[trialNum+1].stimuli);
        }

        frameOriginalPosX = $("#testFrame").position().left
        imageOriginalPosX = $("#testImg").position().left
        
        // Make image draggable
        $("#testImg").draggable({
            containment: 'parent',
            axis: 'x',
        })

        if(imageDifference !== undefined){
            trialData.push(imageDifference)
        }
        trialNum++
    }else{
        trialData.push(imageDifference)
        $("#trialPage").css('display', 'none')
        $("#thanksPage").css('display', 'block')
        console.log(trialData)

        // combine image offset data with shuffled trial list somehow
    }
}

const getImagePosDif = () =>{ 
    $("#expBut").show() // show next button if image is moved

    let imagePosX = $("#testImg").position().left
    imageDifference = imagePosX - imageOriginalPosX
}
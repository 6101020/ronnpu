//試行順番を決定
var array = [];
//左側試行数
for (let i = 0; i < 68; i++) {
    array.push('a');
}

//右側試行数
for (let i = 0; i < 32; i++) {
    array.push('b');
}

//曖昧試行数
for (let i = 0; i < 100; i++) {
    array.push('c');
}

console.log(array);

function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        // 配列の数値を入れ替える
        [array[i], array[rand]] = [array[rand], array[i]]
    }
    return array;
}

array = shuffle(array);
console.log(array);

/* create timeline */
var timeline = [];

/* define welcome message trial */
var welcome = {
    type: "html-keyboard-response",
    stimulus: "キーボードのキーを押すと始まります"
};
timeline.push(welcome);

/* define instructions trial 
var instructions = {
    type: "html-keyboard-response",
    stimulus: `
        <p>これからスクリーン上に斜線と赤色の円が表示されます</p><p>円の数が斜線よりも左側に多いか右側に多いか判断してください</p>
        <p>円が左側に多いと思ったときはFキーを押してください</p>
        <p>円が右側に多いと思ったときはJキーを押しください</p>
        <p>何かキーを入力すると始まります</p>
      `,
    post_trial_gap: 2000
};
timeline.push(instructions);*/

/* test trials */

//左側が多いパターン
function drawCirc_left(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(window.innerWidth, window.innerHeight);  // 線の終了座標
    ctx.stroke();
    var random = Math.floor(Math.random() * 9) + 12; //最大値20、最小値12　20-12+1=9
    //左側
    for (let i = 0; i < random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (window.innerWidth - 49)) + 30;
        var randomy = Math.floor(Math.random() * (window.innerHeight - 10 - (randomx / window.innerWidth * window.innerHeight + 5) + 1)) + randomx / window.innerWidth * window.innerHeight + 5;
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }

    //右側
    for (let i = 0; i < 20 - random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (window.innerWidth - 49)) + 30;
        var randomy = Math.floor(Math.random() * ((randomx / window.innerWidth * window.innerHeight) - 14)) + 10;
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }
}

//右側が多いパターン
function drawCirc_right(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(window.innerWidth, window.innerHeight);  // 線の終了座標
    ctx.stroke();
    var random = Math.floor(Math.random() * 9) + 12; //最大値20、最小値12　20-12+1=9
    //右側
    for (let i = 0; i < random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (window.innerWidth - 49)) + 30;
        var randomy = Math.floor(Math.random() * ((randomx / window.innerWidth * window.innerHeight) - 14)) + 10;
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }

    //左側
    for (let i = 0; i < 20 - random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (window.innerWidth - 49)) + 30;
        var randomy = Math.floor(Math.random() * (window.innerHeight - 10 - (randomx / window.innerWidth * window.innerHeight + 5) + 1)) + randomx / window.innerWidth * window.innerHeight + 5;
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }
}

//曖昧なパターン
function drawCirc_ambiguous(canvas) {
    var ctx = canvas.getContext('2d');

    //斜線
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(window.innerWidth, window.innerHeight);  // 線の終了座標
    ctx.stroke();
    var random = Math.floor(Math.random() * 3) + 9; //最大値11、最小値9　11-9+1=3
    console.log(random);
    //右側
    for (let i = 0; i < random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (window.innerWidth - 49)) + 30;
        var randomy = Math.floor(Math.random() * ((randomx / window.innerWidth * window.innerHeight) - 14)) + 10;
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }

    //左側
    for (let i = 0; i < 20 - random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (window.innerWidth - 49)) + 30; //width - 20 -20 + 1
        var randomy = Math.floor(Math.random() * (window.innerHeight - 10 - (randomx / window.innerWidth * window.innerHeight + 5) + 1)) + randomx / window.innerWidth * window.innerHeight + 5;
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(window.innerWidth, window.innerHeight, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();
}

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
};

/*左のパターン*/
var left_pattern = {
    type: 'canvas-keyboard-response',
    stimulus: function (c) {
        drawCirc_left(c);
    },
    choices: ['f', 'j'],
    canvas_size: [window.innerHeight, window.innerWidth],
    data: { pattern: 'left' }
};

/*右のパターン*/
var right_pattern = {
    type: 'canvas-keyboard-response',
    stimulus: function (c) {
        drawCirc_right(c);
    },
    choices: ['f', 'j'],
    canvas_size: [window.innerHeight, window.innerWidth],
    data: { pattern: 'right' }
};

/*曖昧なパターン*/
var ambiguous_pattern = {
    type: 'canvas-keyboard-response',
    stimulus: function (c) {
        drawCirc_ambiguous(c);
    },
    choices: ['f', 'j'],
    canvas_size: [window.innerHeight, window.innerWidth],
    data: { pattern: 'ambiguous' }
};

var test_left = {
    timeline: [fixation, left_pattern],
}

var test_right = {
    timeline: [fixation, right_pattern],
}

var test_ambiguous = {
    timeline: [fixation, ambiguous_pattern],
}


for (let i = 0; i < 5; i++) {
    if (array[i] == 'a') {
        timeline.push(test_left);
    } else if (array[i] == 'b') {
        timeline.push(test_right);
    } else if (array[i] == 'c') {
        timeline.push(test_ambiguous);
    }
}
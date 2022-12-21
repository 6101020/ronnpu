//試行順番を決定
var array = [];
//左側試行数
for (let i = 0; i < 34; i++) {
    array.push('a');
}

//右側試行数
for (let i = 0; i < 16; i++) {
    array.push('b');
}

//曖昧試行数
for (let i = 0; i < 50; i++) {
    array.push('c');
}

function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        // 配列の数値を入れ替える
        [array[i], array[rand]] = [array[rand], array[i]]
    }
    return array;
}

array = shuffle(array);

//試行数
var kaime = '回目';
var shikou = 1;
var text = '';
var nab = '';

//画面サイズ
var swid = document.documentElement.clientWidth * 0.9;
var shat = document.documentElement.clientHeight * 0.9;

//ドットを描く範囲
var d_swid = document.documentElement.clientWidth * 0.8;
var d_shat = document.documentElement.clientHeight * 0.8;


//画面サイズ-ドット範囲
var sax = swid - d_swid;
var say = shat - d_shat;

/* create timeline */
var timeline = [];

/* define welcome message trial */
var welcome = {
    type: "html-keyboard-response",
    stimulus: "キーボードのキーを押すと始まります"
};
timeline.push(welcome);

//左側が多いパターン
function drawCirc_left(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(sax, say);
    ctx.lineTo(d_swid, d_shat);  // 線の終了座標
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(sax, say, d_swid - sax, d_shat - say);
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = 'normal 16pt "メイリオ"'
    ctx.fillText('左側が多い', sax - 130, shat / 2)
    ctx.fillText('Fキー(0.5円)', sax - 130, shat / 2 + 20)
    ctx.fillText('右側が多い', d_swid + 5, shat / 2)
    ctx.fillText('Jキー(5円)', d_swid + 5, shat / 2 + 20)

    nab = shikou.toString();
    text = nab + kaime;
    ctx.fillText(text, d_swid + 5, say)
    shikou = shikou + 1;

    var random = Math.floor(Math.random() * 9) + 12; //最大値20、最小値12　20-12+1=9
    //左側
    for (let i = 0; i < random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (d_swid - (2 * sax) - 19)) + sax + 10; //width - 20 -20 + 1
        var randomy = Math.floor(Math.random() * (d_shat - say - (randomx / (d_swid - sax) * (d_shat - say)) - 19)) + (randomx / (d_swid - sax) * (d_shat - say)) + 10;
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }

    //右側
    for (let i = 0; i < 20 - random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (d_swid - (2 * sax) - 19)) + sax + 10; //　最大値 d_swid-sax-10　最小値 sax+10
        var randomy = Math.floor(Math.random() * ((randomx / (d_swid - sax) * (d_shat - say)) - say - 19)) + say + 10; //最大値　d-shat-say-10 最小値say+10
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }
}

//右側が多いパターン
function drawCirc_right(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(sax, say);
    ctx.lineTo(d_swid, d_shat);  // 線の終了座標
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(sax, say, d_swid - sax, d_shat - say);
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = 'normal 16pt "メイリオ"'
    ctx.fillText('左側が多い', sax - 130, shat / 2)
    ctx.fillText('Fキー(0.5円)', sax - 130, shat / 2 + 20)
    ctx.fillText('右側が多い', d_swid + 5, shat / 2)
    ctx.fillText('Jキー(5円)', d_swid + 5, shat / 2 + 20)

    nab = shikou.toString();
    text = nab + kaime;
    ctx.fillText(text, d_swid + 5, say)
    shikou = shikou + 1;

    var random = Math.floor(Math.random() * 9) + 12; //最大値20、最小値12　20-12+1=9
    //右側
    for (let i = 0; i < random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (d_swid - (2 * sax) - 19)) + sax + 10; //　最大値 d_swid-sax-10　最小値 sax+10
        var randomy = Math.floor(Math.random() * ((randomx / (d_swid - sax) * (d_shat - say)) - say - 19)) + say + 10; //最大値　d-shat-say-10 最小値say+10
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }

    //左側
    for (let i = 0; i < 20 - random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (d_swid - (2 * sax) - 19)) + sax + 10; //width - 20 -20 + 1
        var randomy = Math.floor(Math.random() * (d_shat - say - (randomx / (d_swid - sax) * (d_shat - say)) - 19)) + (randomx / (d_swid - sax) * (d_shat - say)) + 10;
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
    ctx.moveTo(sax, say);
    ctx.lineTo(d_swid, d_shat);  // 線の終了座標
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(sax, say, d_swid - sax, d_shat - say);
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = 'normal 16pt "メイリオ"'
    ctx.fillText('左側が多い', sax - 130, shat / 2)
    ctx.fillText('Fキー(0.5円)', sax - 130, shat / 2 + 20)
    ctx.fillText('右側が多い', d_swid + 5, shat / 2)
    ctx.fillText('Jキー(5円)', d_swid + 5, shat / 2 + 20)
    nab = shikou.toString();
    text = nab + kaime;
    ctx.fillText(text, d_swid + 5, say)
    shikou = shikou + 1;


    var random = Math.floor(Math.random() * 3) + 9; //最大値11、最小値9　11-9+1=3

    //右側
    for (let i = 0; i < 20 - random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (d_swid - (2 * sax) - 19)) + sax + 10; //　最大値 d_swid-sax-10　最小値 sax+10
        var randomy = Math.floor(Math.random() * ((randomx / (d_swid - sax) * (d_shat - say)) - say - 19)) + say + 10; //最大値　d-shat-say-10 最小値say+10
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }

    //左側
    for (let i = 0; i < random; i++) {
        ctx.beginPath();
        var randomx = Math.floor(Math.random() * (d_swid - (2 * sax) - 19)) + sax + 10; //width - 20 -20 + 1
        var randomy = Math.floor(Math.random() * (d_shat - say - (randomx / (d_swid - sax) * (d_shat - say)) - 19)) + (randomx / (d_swid - sax) * (d_shat - say)) + 10;
        ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fill();
    }
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
    canvas_size: [shat, swid],
    data: { pattern: 'left' }
};

/*右のパターン*/
var right_pattern = {
    type: 'canvas-keyboard-response',
    stimulus: function (c) {
        drawCirc_right(c);
    },
    choices: ['f', 'j'],
    canvas_size: [shat, swid],
    data: { pattern: 'right' }
};

/*曖昧なパターン*/
var ambiguous_pattern = {
    type: 'canvas-keyboard-response',
    stimulus: function (c) {
        drawCirc_ambiguous(c);
    },
    choices: ['f', 'j'],
    canvas_size: [shat, swid],
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

for (var t = 0; t < 100; t++) {
    var nab = shikou.toString();
    if (array[t] == 'a') {
        timeline.push(test_left);
    } else if (array[t] == 'b') {
        timeline.push(test_right);
    } else if (array[t] == 'c') {
        timeline.push(test_ambiguous);
    }
}

  /* create timeline */
  var timeline = [];

  /* define welcome message trial */
  var welcome = {
    type: "html-keyboard-response",
    stimulus: "実験にご協力いただきありがとうございます。何かキーを押してください"
  };
  timeline.push(welcome);

  /* define instructions trial */
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
  timeline.push(instructions);

  /* test trials */

  //左側が多いパターン
  function drawCirc_left(c) {
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(window.innerWidth, window.innerHeight);  // 線の終了座標
    ctx.stroke();

    var random = Math.floor(Math.random() * 9) + 12; //最大値20、最小値12　20-12+1=9
    //左側
    for (let i = 0; i < random; i++) {
      ctx.beginPath();
      var randomx = Math.floor(Math.random() * (window.innerWidth + 1)) + 0;
      var randomy = Math.floor(Math.random() * (window.innerHeight - (randomx / window.innerWidth * window.innerHeight) + 1)) + randomx / window.innerWidth * window.innerHeight;
      ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fill();
    }

    //右側
    for (let i = 0; i < 20 - random; i++) {
      ctx.beginPath();
      var randomx = Math.floor(Math.random() * (window.innerWidth + 1)) + 0;
      var randomy = Math.floor(Math.random() * ((randomx / window.innerWidth * window.innerHeight) + 1)) + 0;
      ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fill();
    }
  }

  //右側が多いパターン
  function drawCirc_right(c) {
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(window.innerWidth, window.innerHeight);  // 線の終了座標
    ctx.stroke();
    var random = Math.floor(Math.random() * 9) + 12; //最大値20、最小値12　20-12+1=9
    //右側
    console.log(random);
    for (let i = 0; i < random; i++) {
      ctx.beginPath();
      var randomx = Math.floor(Math.random() * (window.innerWidth + 1)) + 0;
      var randomy = Math.floor(Math.random() * ((randomx / window.innerWidth * window.innerHeight) + 1)) + 0;
      ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fill();
    }

    //左側
    for (let i = 0; i < 20 - random; i++) {
      ctx.beginPath();
      var randomx = Math.floor(Math.random() * (window.innerWidth + 1)) + 0;
      var randomy = Math.floor(Math.random() * (window.innerHeight - (randomx / window.innerWidth * window.innerHeight) + 1)) + randomx / window.innerWidth * window.innerHeight;
      ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fill();
    }
  }

  //曖昧なパターン
  function drawCirc_ambiguous(c) {
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(window.innerWidth, window.innerHeight);  // 線の終了座標
    ctx.stroke();
    var random = Math.floor(Math.random() * 3) + 9; //最大値11、最小値9　11-9+1=3
    //右側
    console.log(random);
    for (let i = 0; i < random; i++) {
      ctx.beginPath();
      var randomx = Math.floor(Math.random() * (window.innerWidth + 1)) + 0;
      var randomy = Math.floor(Math.random() * ((randomx / window.innerWidth * window.innerHeight) + 1)) + 0;
      ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fill();
    }

    //左側
    for (let i = 0; i < 20 - random; i++) {
      ctx.beginPath();
      var randomx = Math.floor(Math.random() * (window.innerWidth + 1)) + 0;
      var randomy = Math.floor(Math.random() * (window.innerHeight - (randomx / window.innerWidth * window.innerHeight) + 1)) + randomx / window.innerWidth * window.innerHeight;
      ctx.arc(randomx, randomy, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fill();
    }
  }

  var test_stimuli = [
    { stimulus: drawCirc_left, correct_response: 'f' },
    { stimulus: drawCirc_right, correct_response: 'j' },
    { stimulus: drawCirc_ambiguous, correct_response: 'f' & 'j' }
  ];

  var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    data: {
      task: 'fixation'
    }
  }

  var test = {
    type: 'canvas-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    canvas_size: [window.innerHeight, window.innerWidth],
    data: { shape: 'circle', radius: 50 }
  }

  var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    repetitions: 1,
    randomize_order: true
  }
  timeline.push(test_procedure);

  /* define debrief */

  /* start the experiment */
  jsPsych.init({
    timeline: timeline,
    on_finish: function () {
      jsPsych.data.displayData();
    }
  });

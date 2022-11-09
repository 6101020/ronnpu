
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
  function line(f) {
    var fig = f.getContext('2d');
    fig.beginPath();            // 新しいパスを作成
    fig.lineWidth = 2;      // 線の太さ
    //fig.strokeStyle = black;    // 線の色
    fig.moveTo(0, 0);          // 線の開始座標
    fig.lineTo(window.innerHeight, window.innerWidth);          // 線の終了座標
    fig.stroke();               // 輪郭を描画
  }

  function drawCirc_left(c) {
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.moveTo(0, 0);          // 線の開始座標
    ctx.lineTo(window.outerWidth, window.outerHeight);          // 線の終了座標
    ctx.stroke();
  }

  function drawCirc_right(c) {
    //line();
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(300, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
  }

  function drawCirc_ambiguous(c) {
    //line();
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(500, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
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

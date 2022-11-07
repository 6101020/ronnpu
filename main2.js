const jsPsych = initJsPsych({
  on_finish: function() {
      jsPsych.data.displayData();
  }
  })
  console.log(`jsPsych Version ${jsPsych.version()}`)

  const pixi_flag = jsPsych.data.getURLVariable('pixi_flag') === '1' ? true : false;

  const instruction = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 'Click on the Start button.',
  choices: ['Start'],
  prompt: "This is a sample program for the jspsych-psychophysics plugin."
  }

  const line_object = {
  obj_type: 'line',
  x1: 0,
  y1: 0,
  x2: window.innerWidth,
  y2: window.innerHeight,
  line_width: 2,
  }


  const trial = {
  type: jsPsychPsychophysics,
  pixi: pixi_flag,
  stimuli: [line_object],
  choices: ['y', 'n'], // The participant can respond to the stimuli using the 'y' or 'n' key.
  background_color: 'RGB = [255, 255, 255]',
  }

  jsPsych.run([trial])

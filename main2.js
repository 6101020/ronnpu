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

let color = 0;

const text_object = {
obj_type: 'text',
startX: 0,
startY: 100,
origin_center: true,
content: 'RGB = [0, 0, 0]',
font: "22px 'Arial'",
text_color: 'white',
change_attr: function(stim){ // Change the content dynamically
      const content = `RGB = [${color}, ${color}, ${color}]`;
      if (pixi_flag) { // Using PixiJS
          stim.pixi_obj.text = content
      } else {
          stim.content = content
      }
} 
}

let elem = document.elementFromPoint(x, y);

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
  stimuli: [text_object, line_object],
  choices: ['y', 'n'], // The participant can respond to the stimuli using the 'y' or 'n' key.
  background_color: 'RGB = [255, 255, 255]',
  //canvas_width: 1600,
  //canvas_height: 600,
}

jsPsych.run([instruction, trial])
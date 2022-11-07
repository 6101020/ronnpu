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

const rect_object = {
  obj_type: 'rect', // means a rectangle
  startX: 0, // location in the canvas
  startY: 0,
  origin_center: true,
  width: 100, // of the rectangle
  height: 100,
  line_color: 'rgb(0,0,0)',
  fill_color: 'rgb(0,0,0)',
  line_width: 4,
  change_attr: function(stim, times, frames){ // called by the requestAnimationFrame
      const frequency = 0.05;
      const sin_value = Math.sin(2 * Math.PI * frequency * times/1000) // The times are in terms of milliseconds
      const normalized_value = sin_value/2 + 1/2; // from 0 to 1
      color = Math.floor(normalized_value * 255) // An integer between 0 and 255
      const color_info = `rgb(${color}, ${color}, ${color})`

      if (pixi_flag) { // Using PixiJS
          const color_num = jsPsych.getCurrentTrial().getColorNum(color_info)
          stim.pixi_obj.beginFill(color_num, 1);
          stim.pixi_obj.drawRect(-stim.width/2, -stim.height/2, stim.width, stim.height);
          stim.pixi_obj.endFill();
      } else {
          stim.fill_color = color_info
      }
  }
}

const trial = {
  type: jsPsychPsychophysics,
  pixi: pixi_flag,
  stimuli: [text_object, rect_object],
  choices: ['y', 'n'], // The participant can respond to the stimuli using the 'y' or 'n' key.
  //canvas_width: 1600,
  //canvas_height: 600,
}

jsPsych.run([instruction, trial])
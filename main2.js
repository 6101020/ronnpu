
    const jsPsych = initJsPsych({
        on_finish: function () {
            jsPsych.data.displayData();
        }
    })
    console.log(`jsPsych Version ${jsPsych.version()}`)

    const pixi_flag = jsPsych.data.getURLVariable('pixi_flag') === '1' ? true : false;

    const instruction = {
        type: jsPsychHtmlButtonResponse,
        stimulus: 'スタートボタンを押すと始まります',
        choices: ['Start'],
    }

    const cross_object = {
        obj_type: 'cross',
        line_length: 50,
        line_color: 'black', // You can use the HTML color name instead of the HEX color.
        show_end_time: 1000,
    }

    const line_object = {
        obj_type: 'line',
        x1: 0,
        y1: 0,
        x2: window.innerWidth,
        y2: window.innerHeight,
        line_width: 2,
        line_color: 'black',
        show_start_time: 1000,
    }

    const circle_object = {
        obj_type: 'circle',
        startX: 500,
        startY: 500,
        fill_color: 'red',
        radius: 15,
        line_color: 'red',
        show_start_time: 1000,
    }

    var num = 90;
    const circle_object2 = {
        obj_type: 'circle',
        startX: 600,
        startY: 600,
        fill_color: 'red',
        radius: 15,
        line_color: 'red',
        show_start_time: 1000,
    }


    const trial = {
        type: jsPsychPsychophysics,
        pixi: pixi_flag,
        stimuli: [cross_object, line_object, circle_object, circle_object2],
        background_color: [255, 255, 255],
    }

    jsPsych.run([instruction, trial])

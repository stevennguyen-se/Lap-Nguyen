//Initial
var audio_context = window.AudioContext || window.webkitAudioContext;
var con = new audio_context();
// create an oscillator
var osc = con.createOscillator();
osc.type = 'triangle';
// create a filter
var filter = con.createBiquadFilter();
// store sample data
var sound1;
var sound2;
var sound3;
var sound4;
var seq1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var seq2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var seq3 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var seq4 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// we can reduce the gain on the filter 
// without using a gain node, which is handy...
filter.gain.value = 0.5;
// wire the oscillator into the filter
osc.connect(filter);
// wire the filter into the audio output
filter.connect(con.destination);

// set some properties on the oscillator and filter
osc.frequency.value = 200;
filter.frequency.value = 200;


osc.start();

function ChangeFilter(mx, my) {
    filter.frequency.value = mx * 100;
    filter.Q.value = my / 25;
}

function setNote(key) {
    if (key == "z") {
        // play a c
        osc.frequency.value = 261.63;
    }
    if (key == "x") {
        // play a c
        osc.frequency.value = 293.66;
    }
    if (key == "c") {
        // play a c
        osc.frequency.value = 329.63;
    }
    if (key == "v") {
        // play a c
        osc.frequency.value = 349.23;
    }
}

function PlaySound(buffer, time, level) {
    var player = con.createBufferSource();
    player.buffer = buffer;
    player.loop = false;
    var filter = con.createGain();
    filter.gain.value = level;
    player.connect(filter);
    filter.connect(con.destination);
    player.start(time);
}

function LoadSample(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        var audioData = request.response;
        con.decodeAudioData(audioData, function (buffer) {
            console.log(buffer);
            callback(buffer);
        });
    };
    request.send();
}

function ChangeNote() {
    freq = freq * 1.5;
    if (freq > 2000) {
        freq = 200 + (Math.random() * 100);
    }
    osc.frequency.value = freq;
    osc.frequency.setValueAtTime(freq, con.currentTime);
}

var midiToFreq = {
    21: 27.50,
    22: 29.14,
    23: 30.87,
    24: 32.70,
    25: 34.65,
    26: 36.71,
    27: 38.89,
    28: 41.20,
    29: 43.65,
    30: 46.25,
    31: 49.00,
    32: 51.91,
    33: 55.00,
    34: 58.27,
    35: 61.74,
    36: 65.41,
    37: 69.30,
    38: 73.42,
    39: 77.78,
    40: 82.41,
    41: 87.31,
    42: 92.50,
    43: 98.00,
    44: 103.83,
    45: 110.00,
    46: 116.54,
    47: 123.47,
    48: 130.81,
    49: 138.59,
    50: 146.83,
    51: 155.56,
    52: 164.81,
    53: 174.61,
    54: 185.00,
    55: 196.00,
    56: 207.65,
    57: 220.00,
    58: 233.08,
    59: 246.94,
    60: 261.63
};

//Set UI elements
var sequencer1 = new Nexus.Sequencer('#sequencer1', {
    'size': [200, 20],
    'mode': 'toggle',
    'rows': 1,
    'columns': seq1.length
});
var sliderVolum1 = new Nexus.Slider('#sliderVolum1', {
    'size': [100, 20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0.1,
    'value': 1
});
var sequencer2 = new Nexus.Sequencer('#sequencer2', {
    'size': [200, 20],
    'mode': 'toggle',
    'rows': 1,
    'columns': seq2.length
});
var sliderVolum2 = new Nexus.Slider('#sliderVolum2', {
    'size': [100, 20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0.1,
    'value': 1
});
var sequencer3 = new Nexus.Sequencer('#sequencer3', {
    'size': [200, 20],
    'mode': 'toggle',
    'rows': 1,
    'columns': seq3.length
});
var sliderVolum3 = new Nexus.Slider('#sliderVolum3', {
    'size': [100, 20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0.1,
    'value': 1
});
var sequencer4 = new Nexus.Sequencer('#sequencer4', {
    'size': [200, 20],
    'mode': 'toggle',
    'rows': 1,
    'columns': seq4.length
});
var sliderVolum4 = new Nexus.Slider('#sliderVolum4', {
    'size': [100, 20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0.1,
    'value': 1
});
var position = new Nexus.Position('#position', {
    'size': [100, 100],
    'mode': 'absolute',  // "absolute" or "relative"
    'x': 100,  // initial x value
    'minX': 0,
    'maxX': 200,
    'stepX': 1,
    'y': 100,  // initial y value
    'minY': 0,
    'maxY': 200,
    'stepY': 1
});

var piano = new Nexus.Piano('#keyboard', {
    'size': [600, 100],
    'mode': 'button',  // 'button', 'toggle', or 'impulse'
    'lowNote': 21,
    'highNote': 61
});

//Set listeners
for (var i = 0; i < seq1.length; i++) {

}

sequencer1.on('change', function (v) {
    if (v.row !== undefined) {
        seq1[v.column] = v.state;
    }
});
sequencer2.on('change', function (v) {
    if (v.row !== undefined) {
        seq2[v.column] = v.state;
    }
});
sequencer3.on('change', function (v) {
    if (v.row !== undefined) {
        seq3[v.column] = v.state;
    }
});
sequencer4.on('change', function (v) {
    if (v.row !== undefined) {
        seq4[v.column] = v.state;
    }
});
position.on('change', function (v) {
    console.log(v);
    ChangeFilter(v.x, v.y);
})
piano.on('change', function (v) {
    osc.frequency.value = midiToFreq[v.note];
});

//Call
LoadSample('/sounds/CB.WAV', function (buffer) {
    sound1 = buffer;
});
LoadSample('/sounds/CH.WAV', function (buffer) {
    sound2 = buffer;
});
LoadSample('/sounds/CL.WAV', function (buffer) {
    sound3 = buffer;
});
LoadSample('sounds/CP.WAV', function (buffer) {
    sound4 = buffer;
});

var step = 0;
var interval = 0.25; //danh rat nhanh
var wait_time = 0.25; //nhay rat nhanh
var got_up_to;
setInterval(function () {
    var now = con.currentTime;
    sequencer1.next(step % seq1.length);
    sequencer2.next(step % seq2.length);
    sequencer3.next(step % seq3.length);
    sequencer4.next(step % seq4.length);
    // how far into the future will we schedule? 
    // we schedule beyond the next wait time as we cannot 
    // rely on it being exactly 'wait_time' ms before 
    // we get woken up again, therefore put in a few
    // extra events on the scheduler to cover any delays
    var max_future_time = now + (wait_time * 1.01);
    if (got_up_to > now) {// already scheduled up to this point
        now = got_up_to;
    }

    while (now <= max_future_time) {
        if (seq1[step % seq1.length]) {
            PlaySound(sound1, now, sliderVolum1.value);
        }
        if (seq2[step % seq2.length]) {
            PlaySound(sound2, now, sliderVolum2.value);
        }
        if (seq3[step % seq3.length]) {
            PlaySound(sound3, now, sliderVolum3.value);
        }
        if (seq4[step % seq4.length]) {
            PlaySound(sound4, now, sliderVolum4.value);
        }
        step++;
        now += interval;
    }
    got_up_to = now;
}, wait_time * 1000);
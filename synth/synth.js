let Volume = new Tone.Volume(-12);
let verb = new Tone.JCReverb();
verb.roomSize.value = 0.8;
verb.wet.value = 0.33;

let feedbackDelay = new Tone.PingPongDelay({
			"delayTime" : "6n",
			"feedback" : 0.75,
			"wet" : 0.5
		});
let chorus1 = new Tone.Chorus(1.5, 3, 0.5, 'sine', 180);
chorus1.wet.value = 0.5;
let chorus2 = new Tone.Chorus(2, 2, 0.75, 'sine', -180);
chorus2.wet.value = 0.5;

let feedbackDelay2 = new Tone.PingPongDelay({
			"delayTime" : "2n",
			"feedback" : 0.5,
			"wet" : 0.5
		});

let synth = new Tone.MonoSynth().chain(chorus1,feedbackDelay,verb,Volume, Tone.Master);
synth.oscillator.type = "sawtooth";
synth.envelope = [1, 2, 0.3, 10];
synth.filter.Q = 5;
synth.filter.type = 'lowpass';
synth.filter.rolloff = -12;
synth.filterEnvelope.attack = 1;
synth.filterEnvelope.baseFrequency = 20;
synth.filterEnvelope.octaves = 7;
synth.filterEnvelope.decay = 5;
synth.filterEnvelope.sustain = 0.75;
synth.filterEnvelope.release = 10;
synth.detune = 10;
synth.volume.value = -18;
synth.sync();
let synth2 = new Tone.MonoSynth().chain(chorus2,feedbackDelay2,verb,Volume, Tone.Master);
synth2.oscillator.type = "sawtooth";
synth2.envelope = [1, 5, 0.3, 10];
synth2.filterEnvelope.attack = 0.5;
synth2.filterEnvelope.decay = 5;
synth2.filterEnvelope.sustain = 0.75;
synth2.filterEnvelope.release = 10;
synth2.filter.Q = 5;
synth2.filter.type = 'lowpass';
synth2.filter.rolloff = -24;
synth2.filterEnvelope.baseFrequency = 20;
synth2.filterEnvelope.octaves = 7;
synth2.volume.value = -18;

synth2.detune = 10;
synth2.sync();
let time = new Tone.Time();
let pattern = new Tone.Pattern(function(time, note){
	synth.triggerAttackRelease(note, '4n');
}, ["C#3", "D3", "E3", "F#3", "G#3", "A3", "B3", "C#4"], "random");
pattern.interval = "3n";
pattern.probability = 0.66;
let pattern2 = new Tone.Pattern(function(time, note){
	synth2.triggerAttackRelease(note, '3n');
}, ["C#3", "D3", "E3", "F#3", "G#3", "A3", "B3", "C#4", "D4", "E4", "F#4", "G#4", "A4", "B4", "C#5"], "random");
pattern2.interval = "2n";
pattern2.probability = 0.75;

function setup(){
  createCanvas(windowWidth, windowHeight);
  // synth.toMaster();
  pattern.start(0);
  // synth2.toMaster();
  pattern2.start(0);
  Tone.Transport.start();
  frameRate(30);
}

function draw(){
  background(random(16),random(16),random(16))
}

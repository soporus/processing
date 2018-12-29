let time = new Tone.Time();
let compress = new Tone.Compressor(-48, 4);

let Volume = new Tone.Volume(-6);
// let verb = new Tone.Freeverb();
// verb.roomSize.value = 0.5;
// verb.dampening.value = 3000;
// verb.wet.value = 0.25;
// verb.disconnect();
let cheby = new Tone.Chebyshev(7);
let feedbackDelay = new Tone.FeedbackDelay({
	"delayTime": "8n",
	"feedback": 0.83,
	"maxDelay": 1,
	"wet": 0.5
});
feedbackDelay.disconnect();

let drum1 = new Tone.MembraneSynth().chain(cheby, Volume, compress, Tone.Master);
drum1.oscillator.type = 'sine';
drum1.envelope.sustain = 0.25;
drum1.envelope.release = 0.75;
drum1.sync();

let drum2 = new Tone.MembraneSynth().chain(Volume, compress, Tone.Master);
drum2.oscillator.type = 'sine';
drum2.envelope.sustain = 0.2;
drum2.envelope.release = 0.2;
drum2.sync();

let hat = new Tone.MetalSynth().chain(Volume, compress, Tone.Master);
hat.envelope.attack = 0.01;
hat.envelope.decay = 0.1;
hat.envelope.sustain = 0.05;
hat.envelope.release = 1;
hat.volume.value = -18;
hat.sync();
let synth = new Tone.MonoSynth().chain(Volume, compress, Tone.Master);
// synthSetup();
synth.oscillator.type = "sawtooth";
synth.envelope = [1, 2, 0.3, 10];
synth.filter.Q = 3;
synth.filter.type = 'lowpass';
synth.filter.rolloff = -12;
synth.filterEnvelope.attack = 1.2;
synth.filterEnvelope.baseFrequency = 80;
synth.filterEnvelope.octaves = 8;
synth.filterEnvelope.decay = 5;
synth.filterEnvelope.sustain = 0.75;
synth.filterEnvelope.release = 10;
synth.volume.value = -12;
synth.sync();
let synth2 = new Tone.MonoSynth().chain(feedbackDelay, Volume, compress, Tone.Master);
synth2.oscillator.type = "sawtooth";
synth2.envelope = [0.02, 0.2, 0.3, 1];
synth2.filterEnvelope.attack = 0.02;
synth2.filterEnvelope.decay = 0.25;
synth2.filterEnvelope.sustain = 0.5;
synth2.filterEnvelope.release = 1;
synth2.filter.Q = 0.5;
synth2.filter.type = 'lowpass';
synth2.filter.rolloff = -12;
synth2.filterEnvelope.baseFrequency = 100;
synth2.volume.value = -12;
synth2.sync();
let synthPattern = new Tone.Pattern(function(time, note) {
	synth.detune = random(10.0);
	synth.triggerAttackRelease(note, "1n");
}, ["Db2", "D3", "E2", "Gb3", "Ab2", "A3", "B2", "Db3"], "random");
synthPattern.interval = "1m";
synthPattern.probability = 0.9;
let synth2Pattern = new Tone.Pattern(function(time, note) {
		synth2.filterEnvelope.octaves = random(1, 7);
		synth2.detune = random(10.0);
		synth2.filterEnvelope.attack = random(0.02, 0.1);
		synth2.triggerAttackRelease(note, "32n");
	}, ["Db4", "E4", "Gb4"],
	"upDown");
synth2Pattern.interval = "2n";
synth2Pattern.probability = 0.75;

let drum1Pattern = new Tone.Pattern(function(time, note) {
		cheby.order = int(random(1, 4));
		drum1.pitchDecay = random(0.001, 0.01);
		drum1.octaves = random(6, 10);
		drum1.triggerAttackRelease(note, "16n");
	}, ["D3", "Gb3"],
	"random");
drum1Pattern.interval = "8n";
drum1Pattern.probability = 0.5;

let drum2Pattern = new Tone.Pattern(function(time, note) {
	drum2.pitchDecay = random(0.02, 0.055);
	drum2.octaves = random(8, 10);
	drum2.triggerAttackRelease(note, "8n");
}, ["B1"]);
drum2Pattern.interval = "4n";

let hatPattern = new Tone.Pattern(function(time, note) {
	hat.octaves = random(0.1, 1.5);
	hat.envelope.attack = random(0.001, 0.02);
	hat.envelope.decay = random(0.02, 0.1);
	hat.envelope.sustain = random(0.02, 0.075);
	hat.envelope.release = random(0.25, 2);
	hat.harmonicity = random(4.3, 5.1);
	hat.modulationIndex = random(12, 32);
	hat.triggerAttackRelease();
});
hatPattern.interval = "16n";
hatPattern.probability = 0.75;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	synthPattern.start(0);
	synth2Pattern.start(0);
	drum1Pattern.start(0);
	drum2Pattern.start(0);
	hatPattern.start(0);
	Tone.Transport.latencyHint = 'playback';
	Tone.Transport.start();
	frameRate(30);
}

function draw() {
	// background(random(64), random(16), random(48))
}

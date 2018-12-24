var fft, analyzer, drum, drum2, drum3, synth, synth2, synth3, reverb, delay;

var spectrum;
// var stepTaken = false;
var scaleArray2 = [49, 50, 52, 54, 56, 57, 58, 61, 64, 66, 68];
var scaleArray = [49, 52, 56, 58, 64, 68];

function setup() {
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  drum = new DrumObject(0.0, 0.12, 0.0, 0.0, 300, 50, 'triangle');
  drum.osc.freq(0);
  drum2 = new DrumObject(0.0, 0.04, 0.0, 0.0, 4000, 200, 'sine');
  drum2.osc.freq(0);
  drum3 = new DrumObject(0.0, 0.02, 0.0, 0.0, 500, 900, 'noise');
  synth = new DrumObject(0.2, 0.6, 0.2, 0.8, 400, 400, 'sawtooth');
  synth.osc.freq(0);
  synth.filter.freq(300);
  synth.filter.res(.5);
  synth.filter.amp(.4);

  synth2 = new DrumObject(0.23, 0.6, 0.2, 0.8, 400, 400, 'sawtooth');
  synth2.osc.freq(0);
  synth2.filter.freq(750);
  synth2.filter.res(1);
  synth2.filter.amp(.3);
  synth2.osc.pan(-.4);

  synth3 = new DrumObject(0.23, 0.6, 0.2, 0.8, 400, 400, 'sawtooth');
  synth3.osc.freq(0);
  synth3.filter.freq(565);
  synth3.filter.res(2);
  synth3.filter.amp(.25);
  synth3.osc.pan(.4);

  reverb.process(synth2.filter, 8, 8);
  reverb.process(synth3.filter, 8, 8);
  reverb.process(drum3.filter, 2, 8);
  delay.process(drum2.filter,.12, .25, 900);
//   delay.process(synth.filter,.12, .50, 900);

//   drum3.osc.freq(0);
  analyzer = new p5.Amplitude();
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(64);
  stroke(255, 0, 128);
  fill(0, 64, 128);
  fft = new p5.FFT(0.6, 64);
}

function draw() {
  background(0);
  stepTaken = false;
  if (stepTaken == false) {
    if ((frameCount % 64) == 0 || (frameCount % 144) == 0) {
      drum.trigger();
//       stepTaken = true;
    }
  }
  if (stepTaken == false) {
    if ((frameCount % 96) == 0) {
      drum2.trigger();
//       stepTaken = true;
    }
  }
  if (stepTaken == false) {
    if ((frameCount % 16) == 0 || (frameCount % 36) == 0) {
      drum3.trigger();
//       stepTaken = true;
    }
  }
  if (stepTaken == false) {
    if (((frameCount % 80) == 0) || (frameCount % 128) == 0) {
      var freqValue = midiToFreq(random(scaleArray));
      synth.osc.freq(freqValue / int(random(2,3)));
      synth.trigger();
//       stepTaken = true;
    }
  }
  if (stepTaken == false) {
    if (((frameCount % 96) == 0) || (frameCount % 112) == 0) {
      var freqValue = midiToFreq(random(scaleArray));
      synth2.osc.freq(freqValue * int(random(2,3)));
      synth2.trigger();
//       stepTaken = true;
    }
  }
  if (stepTaken == false) {
    if (((frameCount % 128) == 0) || (frameCount % 160) == 0) {
      var freqValue = midiToFreq(random(scaleArray));
      synth3.osc.freq(freqValue);
      synth3.trigger();
//       stepTaken = true;
    }
  }
//   print(analyzer.getLevel());
  // draw filtered spectrum
  //
  translate(-width / 2, -height / 2);
  spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
}
//redraw with new window dimensions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function DrumObject(tempA, tempD, tempS, tempR, tempAttackL, tempReleaseL, tempOsc) {
  this.A = tempA;
  this.D = tempD;
  this.S = tempS;
  this.R = tempR;
  this.AttackL = tempAttackL;
  this.ReleaseL = tempReleaseL;
  this.oscType = tempOsc;
  if(this.oscType == 'noise') { this.osc = new p5.Noise(); } else {this.osc = new p5.Oscillator(this.oscType);}
  this.filter = new p5.BandPass();
  this.Penv = new p5.Envelope();
  this.Penv.setExp();
  this.Penv.setADSR(this.A, this.D, this.S, this.R);
  if(this.oscType == 'sawtooth') this.Penv.setRange(0, 0); else this.Penv.setRange(this.AttackL, this.ReleaseL);
  this.Aenv = new p5.Envelope();
  this.Aenv.setExp('True');
  if(this.oscType == 'sawtooth') this.Aenv.setADSR(this.A, this.D, this.S, this.R); else this.Aenv.setADSR(0.1, 0.05, 0.025, 0.12);
  if(this.oscType == 'sawtooth') this.Aenv.setRange(0.1, 0.0); else this.Aenv.setRange(0.3, 0.0);
  this.osc.disconnect();
  if(this.oscType != 'noise') this.osc.freq(this.Penv);
  this.osc.connect(this.filter);
  this.filter.freq(16000);
  if(this.oscType == 'noise') {this.filter.res(33); this.filter.freq(10000);} else this.filter.res(0);
  this.osc.start();
  this.osc.amp(this.Aenv);

  this.trigger = function() {
    this.Aenv.play();
    this.Penv.play();
  }
}
var fft, analyzer, drum, drum2, drum3, synth, synth2, synth3, reverb, delay;

var spectrum;
// var stepTaken = false;
var scaleArray = [49, 52, 56, 58, 64, 68];
var freqValue;

function setup() {
  reverb = new p5.Reverb();
  delay = new p5.Delay(1);
  //kick
  drum = new SynthObject('drum', 'square');
  drum.osc.freq(0);
  drum.Penv.setRange(400, 31);
  drum.Penv.setADSR(0.0, 0.03, 0.05, 0.2);
  drum.filter.freq(120);
  drum.filter.res(1.5);
  //snare
  drum2 = new SynthObject('drum', 'triangle');
  drum2.osc.freq(0);
  drum2.Penv.setRange(10000, 140);
  drum2.Penv.setADSR(0.0, 0.01, 0.005, 0.2);
  drum2.filter.freq(200);
  drum2.filter.res(1.0);
  //noise
  drum3 = new SynthObject('drum', 'noise');
  //synth bass
  synth = new SynthObject('synth', 'square');
  synth.osc.freq(0);
  synth.filter.freq(300);
  synth.filter.res(0.5);
  synth.filter.amp(0.5);
  //synth mid
  synth2 = new SynthObject('synth', 'sawtooth');
  synth2.osc.freq(0);
  synth2.filter.freq(750);
  synth2.filter.res(1);
  synth2.filter.amp(0.4);
  synth2.osc.pan(-0.4);
  synth2.filter.disconnect();
  //synth high
  synth3 = new SynthObject('synth', 'sawtooth');
  synth3.osc.freq(0);
  synth3.filter.freq(565);
  synth3.filter.res(2);
  synth3.filter.amp(0.3);
  synth3.osc.pan(0.4);
  synth3.filter.disconnect();

  reverb.process(synth2.filter, 10, 1);
  reverb.process(synth3.filter, 10, 1);
  reverb.process(drum3.filter, 2, 8);
  // delay.process(drum2.filter, 0.025, 0.5, 900);
  delay.process(synth2.filter, 0.2, 0.8, 1900);
  delay.process(synth3.filter, 0.2, 0.8, 1900);

  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(64);
  stroke(255, 0, 128);
  fill(0, 64, 64);
  fft = new p5.FFT(0.7, 32);
}

function draw() {
  background(0);
  //kick
  if ((frameCount % 64) === 0 || (frameCount % 144) === 0) {
    drum.trigger();
  }
  //snare
  if ((frameCount % 96) === 0) {
    drum2.trigger();
  }
  //noise
  if ((frameCount % 16) === 0 || (frameCount % 36) === 0) {
    drum3.trigger();
  }
  //synth bass
  if (((frameCount % 80) === 0) || (frameCount % 128) === 0) {
    freqValue = midiToFreq(random(scaleArray));
    synth.osc.freq(freqValue / int(random(2, 3)));
    synth.trigger();
  }
  //synth mid
  if (((frameCount % 96) === 0) || (frameCount % 112) === 0) {
    freqValue = midiToFreq(random(scaleArray));
    synth2.osc.freq(freqValue * int(random(2, 3)));
    synth2.trigger();
  }
  //synth high
  if (((frameCount % 128) === 0) || (frameCount % 160) === 0) {
    freqValue = midiToFreq(random(scaleArray));
    synth3.osc.freq(freqValue);
    synth3.trigger();
  }
  //draw filtered spectrum
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

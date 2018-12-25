var fft, analyzer, drum, drum2, drum3, synth, synth2, synth3, reverb, delay, compressor, mainChannel;
var waveform;
var spectrum;
var scaleArray = [49, 52, 56, 58, 64, 68];
var freqValue;
var loudness;

function setup() {
  loudness = new p5.Amplitude();
  mainChannel = new p5.Gain();
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  compressor = new p5.Compressor();
  delay.setType(1);
  //kick
  drum = new SynthObject('drum', 'triangle');
  drum.osc.freq(0);
  drum.Penv.setRange(2100, 70);
  drum.realLFO.freq(350);
  drum.realLFO.amp(77);
  drum.Penv.setADSR(0.0, 0.01, 0.05, 0.02);
  drum.filter.freq(210);
  drum.filter.res(0.125);
  //snare
  drum2 = new SynthObject('drum', 'triangle');
  drum2.osc.freq(0);
  drum2.realLFO.freq(500);
  drum2.realLFO.amp(67);
  drum2.Penv.setRange(10000, 170);
  drum2.Penv.setADSR(0.0, 0.005, 0.005, 0.01);
  drum2.Aenv.setADSR(0.0, 0.12, 0.1, 0.1);
  drum2.filter.freq(300);
  drum2.filter.res(0.1);
  //noise
  drum3 = new SynthObject('drum', 'noise');
  drum3.Aenv.setADSR(0.02, 0.075, 0.1, 0.25);
  //synth bass
  synth = new SynthObject('synth', 'pulse');
  synth.osc.freq(220);
  synth.LFO1Speed = 20;
  synth.filter.freq(333);
  synth.filter.res(0.5);
  //synth mid
  synth2 = new SynthObject('synth', 'sawtooth');
  synth2.LFO1Speed = 10;
  synth2.osc.freq(0);
  synth2.filter.freq(750);
  synth2.filter.res(1);
  synth2.osc.pan(-0.4);
  //synth high
  synth3 = new SynthObject('synth', 'sawtooth');
  synth3.LFO1Speed = 7;
  synth3.osc.freq(0);
  synth3.filter.freq(565);
  synth3.filter.res(1);
  synth3.osc.pan(0.4);

  reverb.process(synth2.filter);
  reverb.process(synth3.filter);
  reverb.process(drum2.filter);
  reverb.process(drum3.filter, 1, 8);
  reverb.disconnect();
  delay.process(synth2.filter);
  delay.process(synth3.filter, 0.2, 0.7, 1900);
  delay.disconnect();

  drum.channel.connect(mainChannel);
  drum2.channel.connect(mainChannel);
  drum3.channel.connect(mainChannel);
  synth.channel.connect(mainChannel);
  synth2.channel.connect(mainChannel);
  synth3.channel.connect(mainChannel);
  delay.connect(mainChannel);
  reverb.connect(mainChannel);
  //compressor process(src, [attack], [knee], [ratio], [threshold], [release])
  compressor.process(mainChannel, 0.003, 35, 3, -45, 0.25);

  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);
  strokeWeight(2);
  fft = new p5.FFT(0.5, 32);
}

function draw() {
  background(0);
  synth.LFO1Mod();
  synth2.LFO1Mod();
  synth3.LFO1Mod();
  synth.osc.width(map(synth.LFO1, 0, height, 0.33, 0.66));
  synth2.filter.freq(map(synth2.LFO1, 0, height, 500, 1000));
  synth3.filter.freq(map(synth3.LFO1, 0, height, 700, 1200));
  //kick
  if ((frameCount % 32) === 0 || (frameCount % 72) === 0) {
    drum.trigger();
  }
  //snare
  if ((frameCount % 48) === 0) {
    drum2.trigger();
  }
  //noise
  if ((frameCount % 8) === 0 || (frameCount % 18) === 0) {
    drum3.Aenv.setADSR(random(0.0, 0.075), 0.075, 0.05, random(0.25, 0.5));
    drum3.trigger();
  }
  //synth bass
  if (((frameCount % 160) === 0) || (frameCount % 128) === 0) {
    synth.freqValue = float(midiToFreq(random(scaleArray)));
    synth.osc.freq(synth.freqValue / int(random(2, 3)));
    synth.trigger();
  }
  //synth mid
  if (((frameCount % 192) === 0) || (frameCount % 112) === 0) {
    synth2.freqValue = midiToFreq(random(scaleArray));
    synth2.osc.freq(synth2.freqValue / int(random(2, 3)));
    synth2.trigger();
  }
  //synth high
  if (((frameCount % 256) === 0) || (frameCount % 320) === 0) {
    synth3.freqValue = midiToFreq(random(scaleArray));
    synth3.osc.freq(synth3.freqValue);
    synth3.trigger();
  }
  translate(-width / 2, -height / 2);
  //draw waveform
  waveform = fft.waveform(synth.channel);
  // draw the shape of the waveform
  var temploud = 10 + loudness.getLevel() * 200;
  beginShape();
  stroke(0, 192, 255);
  fill(0, temploud, temploud);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, width + width / waveform.length);
    var y = map(waveform[i], -1, 1, -height / 2, height / 2);
    vertex(x, y + height / 4);
  }
  endShape(CLOSE);

  //draw filtered spectrum
  stroke(255, 0, 128);
  fill(temploud, 0, 0);
  spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, height / 4);
    rect(x, height, width / spectrum.length, h);
  }
}
//redraw with new window dimensions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

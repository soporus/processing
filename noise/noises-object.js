//synth object. to do: convert to more general synth with drum or synth flag
//todo: do not pass envelope options here, pass synth type, and osc shape
function SynthObject(tempsynthType,tempOsc) {
  //envelope
  //todo: remove passed env, replace with preset based on flag
  this.synthType = tempsynthType;
  this.oscType = tempOsc;
  //noise has no pitch options
  if (this.oscType === 'noise') {
    this.osc = new p5.Noise();
  } else {
    this.osc = new p5.Oscillator(this.oscType);
  }
  this.osc.disconnect();
  this.Penv = new p5.Envelope();
  this.Aenv = new p5.Envelope();
  this.Aenv.setExp('True');
  if(this.synthType == 'drum'){
    this.Attack = 0.001;
    this.Decay = 0.12;
    this.Sustain = 0.2;
    this.Release = 0.3;
    this.AttackLvl = 300;
    this.ReleaseLvl = 50;
    this.Aenv.setRange(0.3, 0.0);
    //pitch envelope for drums that aren't noise based
    this.Penv.setExp('True');
    this.Penv.setADSR(this.Attack, this.Decay, this.Sustain, this.Release);
    this.Penv.setRange(this.AttackLvl, this.ReleaseLvl);
    if(this.oscType !== 'noise') this.osc.freq(this.Penv);
  } else { // synth
    this.Attack = 0.2;
    this.Decay = 0.6;
    this.Sustain = 0.2;
    this.Release = 0.8;
    this.AttackLvl = 400;
    this.ReleaseLvl = 400;
    this.Aenv.setRange(0.1, 0.0);
  }
  this.Aenv.setADSR(this.Attack, this.Decay, this.Sustain, this.Release);

  //todo: choose filter type
  this.filter = new p5.BandPass();
  //todo: automatically choose if pitch env is applicable, noise osc?

  this.osc.connect(this.filter);
  this.filter.freq(16000);
  if (this.oscType === 'noise') {
    this.filter.res(33);
    this.filter.freq(10000);
  } else this.filter.res(0);

  this.osc.start();
  this.osc.amp(this.Aenv);
  this.trigger = function() {
    this.Aenv.play();
    this.Penv.play();
  }
}

import React, { Component } from 'react';
import RecordButton from './RecordButton.js';
import SoundPanel from './SoundPanel.js';
import VoiceBars from './VoiceBars.js';
import 'p5/lib/addons/p5.sound';
import p5 from 'p5';

class ReverserContainer extends Component {
  constructor() {
    super();

    this.state = {
      isRecording: false,
      isReversed:  false,
      voice:       null,
      voiceLevels: [],
    };

    const mic = new p5.AudioIn();
    const rec = new p5.SoundRecorder();

    mic.start();
    rec.setInput(mic);

    this.mic = mic;
    this.rec = rec;
  }

  addVoiceLevels() {
    const voiceLevel = this.mic.getLevel();

    this.setState({
      voiceLevels: this.state.voiceLevels.concat([voiceLevel])
    });
  }

  startRecordVoice() {
    this.interval = setInterval(this.addVoiceLevels.bind(this), 15);

    this.setState({
      isRecording: true,
      voiceLevels: [],
    });

    this.sf  = new p5.SoundFile();
    this.rec.record(this.sf);
  }

  stopRecordVoice() {
    this.rec.stop();

    this.setState({
      isRecording: false,
      isReversed:  false,
      voiceLevels: [],
      voice:       this.sf,
    });

    clearInterval(this.interval);
    this.interval = null;
  }

  playVoice() {
    if (this.state.isRecording || !this.state.voice) return;

    this.state.voice.play();
  }

  playReversedVoice() {
    if (this.state.isRecording || !this.state.voice) return;

    const voice = this.state.voice;

    voice.reverseBuffer();
    voice.play();
    voice.onended(() => voice.reverseBuffer());
  }

  render(){
    const isRecording       = this.state.isRecording;
    const voiceLevels       = this.state.voiceLevels.slice();
    const partOfVoiceLevels = voiceLevels.reverse().slice(0, 100);
    const startRecordVoice  = this.startRecordVoice.bind(this);
    const stopRecordVoice   = this.stopRecordVoice.bind(this);

    const playVoice         = this.playVoice.bind(this);
    const playReversedVoice = this.playReversedVoice.bind(this);

    return (
      <div className="ReverserContainerStyle">
        <RecordButton isRecording={isRecording}
                      startRecordVoice={startRecordVoice}
                      stopRecordVoice={stopRecordVoice} />

        <SoundPanel playVoice={playVoice}
                    playReversedVoice={playReversedVoice} />

        <VoiceBars voiceLevels={partOfVoiceLevels}/>
      </div>
    );
  }
}

export default ReverserContainer;

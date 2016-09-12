import React, { Component } from 'react';

class VoiceBars extends Component {
  getStyle(voiceLevel) {
    voiceLevel = voiceLevel * 200;

    return {
      height: voiceLevel + '%',
    };
  }

  render() {
    const voiceLevels = this.props.voiceLevels;
    return (
      <div className="VoiceBars">
        {
          voiceLevels.map((voiceLevel, index) => (
            <div key={index} style={this.getStyle(voiceLevel)} className="voice-bar" />
          ))
        }
      </div>
    );
  }
}

export default VoiceBars;

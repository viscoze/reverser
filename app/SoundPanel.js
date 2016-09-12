import React, { Component } from 'react';
import {render} from 'react-dom';

class SoundPanel extends Component {
  render(){
    const { playVoice, playReversedVoice } = this.props;

    return (
      <div className="SoundPanelStyle">
        <div className="PlayButton"    onClick={playVoice}></div>
        <div className="ReverseButton" onClick={playReversedVoice}></div>
      </div>
    );
  }
}

export default SoundPanel;

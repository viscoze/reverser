import React, { Component } from 'react';
import {render} from 'react-dom';

class RecordButton extends Component {
  render(){
    const { isRecording, startRecordVoice, stopRecordVoice, voiceLevels } = this.props;
    const handleClick = isRecording ? stopRecordVoice : startRecordVoice;

    return (
      <div className="RecordButtonStyle">
        <div className="button" onClick={handleClick}>
        </div>
      </div>
    );
  }
}

export default RecordButton;

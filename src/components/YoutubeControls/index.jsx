import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import styles from './styles';

const YoutubeControls = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function getInitialState() {
    return {
      videoCurrentTime: 0,
      audioCurrentTime: 0,
      shortestClipTimeDuration: 0,
      intervalArray: [],
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    switch (nextProps.playStatus) {

      case 1: // Set interval to update timecode on scrubber when playing
        const intervalArray = this.state.intervalArray;
        intervalArray.push(setInterval(this.handleWhilePlayingEvents, 1000));

        this.setState({
          audioCurrentTime: this.props.ytPlayer.audio.getCurrentTime(),
          intervalArray
        });
        break;

      case 5:  // The video is cued
      case -1: // ...ibid
        document.getElementById('defaultSlider').value = 0;
        this.setState({ videoCurrentTime: 0, audioCurrentTime: 0 });
        break;

      default:
        this.state.intervalArray.forEach((interval) => {
          clearInterval(interval);
        });
        this.setState({
          intervalArray: []
        });
        break;
    }
  },
  componentDidMount: function componentDidMount() {
    // Set scrubber initially to 0
    document.getElementById('defaultSlider').value = 0;
  },
  togglePlayPause: function togglePlayPause() {
    const playStatus = this.props.playStatus;

    switch (playStatus) {
      case -1: // Multi-case: if it's paused, stopped or unstarted - play it
      case 2:
      case 5:
        this.props.changePlayingStatus(1);
        break;
      case 1: // If it's playing, pause it
        this.props.changePlayingStatus(2);
        break;
      default:
        break;
    }
  },
  restartVideo: function restartVideo() {
    this.props.ytPlayer.video.seekTo(0);
    this.props.ytPlayer.audio.seekTo(0);
  },
  handleSeek: function handleSeek(event) {
    const seekValue = event.target.value;
    const audioDuration = this.props.ytPlayer.audio.getDuration();
    const videoDuration = this.props.ytPlayer.video.getDuration();

    // Audio controls the experience, so we can seek wherever
    this.props.ytPlayer.audio.seekTo(seekValue);

    if (seekValue < videoDuration) {
    // If the video is shorter than audio, seek w/o issue
      this.props.ytPlayer.video.seekTo(seekValue);
    // Else... jump to the appropriate video position such that video/audio
    // have the same time remaining
    } else {
      let audioRemainingTime = audioDuration - seekValue;
      this.props.ytPlayer.video.seekTo(videoDuration - audioRemainingTime);
    }
  },
  handleWhilePlayingEvents: function handleWhilePlayingEvents() {
    // Set the scrubber and time code to the current time
    const currentAudioTime = this.props.ytPlayer.audio.getCurrentTime();
    const currentVideoTime = this.props.ytPlayer.video.getCurrentTime();
    this.setState({
      audioCurrentTime: currentAudioTime,
      videoCurrentTime: currentVideoTime,
    });
    document.getElementById('defaultSlider').value = currentAudioTime;

    // If the video will end before the audio (within 10s), set the video back
    // to an appropriate time
    const videoDuration = this.props.ytPlayer.video.getDuration();
    const audioDuration = this.props.ytPlayer.audio.getDuration();
    const timeRemainingDifference = Math.abs(
      (videoDuration - currentVideoTime) - (audioDuration - currentAudioTime))

    if (videoDuration - currentVideoTime < 2 && timeRemainingDifference > 5) {
      const audioTimeRemaining = audioDuration - currentAudioTime;

      // If there's more time remaining than the entirety of the video, jump back
      // to 10 seconds into the video
      if (audioTimeRemaining > videoDuration) {
        this.props.ytPlayer.video.seekTo(1);
      } else {
        const syncedTimeRemaining = videoDuration - audioTimeRemaining;
        this.props.ytPlayer.video.seekTo(syncedTimeRemaining);
      }
    }
  },
  utils: {
    secondsToTimestamp: function(totalSec) {
      var hours = parseInt( totalSec / 3600 ) % 24;
      var minutes = parseInt( totalSec / 60 ) % 60;
      var seconds = Math.floor(totalSec % 60);

      // TODO: Fix it so it handles hours, I guess (2016-07-17 11:46:09)
      const result = (
        hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
      // const result = (
        // minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
      return result;
    },
  },
  render: function render() {
    return (
      <div className={styles.container}>
        <div className={styles.sliderContainer}>
          <p>{this.state.audioCurrentTime
            ? this.utils.secondsToTimestamp(this.state.audioCurrentTime)
            : '00:00'}
          </p>
          <input
            className={styles.slider}
            id="defaultSlider"
            type="range"
            min="0"
            max={this.props.clipAudioDuration}
            onChange={this.handleSeek}
            step="1" />
          <p>{this.props.clipAudioDuration
            ? this.utils.secondsToTimestamp(this.props.clipAudioDuration)
            : '--'}
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.playButton} onClick={this.togglePlayPause}>
            {(this.props.playStatus === 1) ? 'Pause' : 'Play'}
          </button>
          <button
            className={styles.playButton}
            onClick={this.restartVideo}>Restart</button>
        </div>
      </div>
    );
  }
});

export default YoutubeControls;

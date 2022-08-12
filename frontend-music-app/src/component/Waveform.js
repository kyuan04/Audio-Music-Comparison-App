import React from "react";
import WaveSurfer from "wavesurfer";

export default class Waveform extends React.Component {
    constructor(props) {
        super(props);

        this.waveformRef = React.createRef();
        this.play = this.play.bind(this);
        this.resetPlayhead = this.resetPlayhead.bind(this);

        this.state = {
            wavesurfer: null,
            isPlaying: false
        };
    }

    componentDidMount() {
        const wavesurfer = WaveSurfer.create({
            container: this.waveformRef.current,
            waveColor: "violet",
            progressColor: "purple"
        });
        this.setState({ wavesurfer });
        wavesurfer.load(this.props.src);
        console.log("this.props.src: " + this.props.src);
        console.log("waveform component mounted")
    }

    componentWillReceiveProps(newProps, nextContext) {
        console.log(newProps);
        if (newProps.isPlaying !== this.props.isPlaying) {
            this.play();
        }
        if (newProps.isAtBeginning === true && newProps.isAtBeginning !== this.props.isAtBeginning) {
            this.resetPlayhead();
        }
    }

    play() {
        this.state.wavesurfer.playPause();
    }

    resetPlayhead() {
        this.state.wavesurfer.seekTo(0);
    }

    render() {
        console.log(this.waveformRef);
        return (
            <div>
                <div ref={this.waveformRef} />
            </div>
        );
    }
}

Waveform.defaultProps = {
    src: ""
};

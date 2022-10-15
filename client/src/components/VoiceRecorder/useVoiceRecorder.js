import { useEffect, useState, useRef } from "react";
import MicRecorder from "mic-recorder-to-mp3";

const useVoiceRecorder = () => {
  const recorder = useRef(null); //Recorder
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(null);
  // const [readyToSubmit, setReadyToSubmit] = useState(false);

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        setIsRecording(false);
        setAudioFile(file);
      })
      .catch((e) => console.log(e));
  };

  return {
    audioFile,
    isRecording,
    startRecording,
    stopRecording,
  };
};

export default useVoiceRecorder;

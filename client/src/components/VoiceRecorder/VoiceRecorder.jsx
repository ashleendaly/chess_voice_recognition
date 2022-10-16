import useVoiceRecorder from "./useVoiceRecorder";
import { useEffect, useRef } from "react";
import { PlayIcon, RecordingIcon, StopIcon, SubmitIcon } from "./icons";

const VoiceRecorder = ({ setAudioFile, makeMove }) => {
  const {
    isRecording,
    funcs: { startRecording, stopRecording },
  } = useVoiceRecorder(setAudioFile);

  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if ("jdJD".includes(e.key)) {
        startRecording();
      } else if ("kfKF".includes(e.key)) {
        stopRecording();
      } else if (e.key === " ") {
        makeMove();
      }
    };

    const element = ref.current;

    element.addEventListener("keypress", handleClick);

    return () => {
      element.removeEventListener("keypress", handleClick);
    };
  }, []);

  return (
    <div className='place-self-center self-center flex flex-col gap-y-5'>
      <div className='flex flex-col justify-center gap-y-4'>
        <button
          className={`p-4 bg-gray-300 rounded-full ${
            isRecording ? "text-red-600" : ""
          }`}
          disabled={isRecording}
          onClick={startRecording}
          ref={ref}
        >
          {isRecording ? <RecordingIcon /> : <PlayIcon />}
        </button>
        <button
          className={`p-4 bg-gray-300 rounded-full ${
            isRecording ? "" : "text-gray-400"
          }`}
          disabled={!isRecording}
          onClick={stopRecording}
          ref={ref}
        >
          <StopIcon />
        </button>

        <button
          className={`p-4 text-gray-300 bg-red-600 hover:bg-red-800 
          cursor-pointer rounded-full`}
          onClick={makeMove}
          ref={ref}
        >
          <SubmitIcon />
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;

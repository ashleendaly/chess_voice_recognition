import useVoiceRecorder from "./useVoiceRecorder";
import { useEffect, useRef } from "react";
import { PlayIcon, RecordingIcon, StopIcon, SubmitIcon } from "./icons";

const VoiceRecorder = ({ setAudioFile, makeMove }) => {
  const {
    isRecording,
    funcs: { startRecording, stopRecording },
  } = useVoiceRecorder(setAudioFile);

  const handleClick = (e) => {
    console.log("clicked: " + e.key);
    if (e.key === "j") {
      startRecording();
    } else if ("kfKF".includes(e.key)) {
      stopRecording();
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleClick, true);
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
        >
          {isRecording ? <RecordingIcon /> : <PlayIcon />}
        </button>
        <button
          className={`p-4 bg-gray-300 rounded-full ${
            isRecording ? "" : "text-gray-400"
          }`}
          disabled={!isRecording}
          onClick={stopRecording}
        >
          <StopIcon />
        </button>

        <button
          className={`p-4 text-gray-300 bg-red-600 hover:bg-red-800 
          cursor-pointer rounded-full`}
          onClick={makeMove}
        >
          <SubmitIcon />
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;

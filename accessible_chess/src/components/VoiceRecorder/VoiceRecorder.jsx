import useVoiceRecorder from "./useVoiceRecorder";
import { LoadingIcon, PlayIcon, RecordingIcon, StopIcon } from "./icons";

const VoiceRecorder = ({ disabled, setAudioFile, handleClick }) => {
  const {
    isRecording,
    funcs: { startRecording, stopRecording },
  } = useVoiceRecorder(setAudioFile);

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

        <div
          className={`p-4 text-gray-300 bg-red-600 hover:bg-red-800 
          cursor-pointer rounded-full`}
          onClick={handleClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <circle cx='12' cy='12' r='10'></circle>
            <polyline points='12 16 16 12 12 8'></polyline>
            <line x1='8' y1='12' x2='16' y2='12'></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;

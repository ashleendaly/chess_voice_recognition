const VoiceRecorder = (props) => {
  const {
    isRecording,
    startRecording,
    stopRecording,
    audioFile,
    submitTranscriptionHandler,
    transcriptData,
    transcript,
    isLoading,
  } = props;

  return (
    <div className='place-self-center self-center flex flex-col gap-y-5'>
      <div className='text-3xl text-center'>
        {transcriptData.status === "completed" ? transcript : ""}
      </div>
      <div className='flex justify-center gap-x-4'>
        <button
          className={`p-4 bg-gray-300 rounded-full ${
            isRecording ? "text-red-600" : ""
          }`}
          disabled={isRecording}
          onClick={startRecording}
        >
          {isRecording ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='12' cy='12' r='10'></circle>
              <circle cx='12' cy='12' r='1'></circle>
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='12' cy='12' r='10'></circle>
              <polygon points='10 8 16 12 10 16 10 8'></polygon>
            </svg>
          )}
        </button>
        <button
          className={`p-4 bg-gray-300 rounded-full ${
            isRecording ? "" : "text-gray-400"
          }`}
          disabled={!isRecording}
          onClick={stopRecording}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10'></circle>
            <rect x='9' y='9' width='6' height='6'></rect>
          </svg>
        </button>
        <button
          className={`p-4 bg-gray-300 rounded-full ${
            audioFile && !isLoading ? "text-green-700" : "text-gray-400"
          }
              ${isLoading ? "animate-spin" : ""}`}
          onClick={submitTranscriptionHandler}
        >
          {isLoading ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 12a9 9 0 1 1-6.219-8.56'></path>
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='5' y1='12' x2='19' y2='12'></line>
              <polyline points='12 5 19 12 12 19'></polyline>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;

import Chessboard from "./components/Chessboard/Chessboard";
import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import VoiceRecorder from "./components/VoiceRecorder/VoiceRecorder";
import { generateChessnotation } from "./components/VoiceRecorder/helpers";
import useVoiceRecorder from "./components/VoiceRecorder/useVoiceRecorder";

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "1bfab80e12d74ef6b9575010a0d8c786",
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});

assembly
  .post("/transcript", {
    audio_url: "https://bit.ly/3yxKEIY",
  })
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));


function App() {
  // const [keyDownCounter, setKeyDownCounter] = useState(0);
  // const [player, setPlayer] = useState("white");

  const { audioFile, isRecording, startRecording, stopRecording } =
    useVoiceRecorder();

  // const handleKeyDown = useCallback((e) => {
  //   if (e.key === " ") {
  //     setKeyDownCounter((previousKeyDown) => previousKeyDown + 1);
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyDown, true);
  //   console.log(keyDownCounter);
  // }, [keyDownCounter, handleKeyDown]);

  // useEffect(() => {
  //   if (keyDownCounter === 4) {
  //     setKeyDownCounter(1);
  //     const otherPlayer = player === "white" ? "black" : "white";
  //     setPlayer(otherPlayer);
  //   }
  // }, [keyDownCounter, handleKeyDown]);

  // AssemblyAI API
  // State variables
  const [uploadURL, setUploadURL] = useState("");
  const [transcriptID, setTranscriptID] = useState("");
  const [transcriptData, setTranscriptData] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err));
    }
  }, [audioFile]);

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id);

        checkStatusHandler();
      })
      .catch((err) => console.error(err));
  };

  // Check the status of the Transcript
  const checkStatusHandler = async () => {
    setIsLoading(true);
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Periodically check the status of the Transcript
  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler();
      } else {
        setIsLoading(false);
        const chessNotation = generateChessnotation(transcriptData.text);
        setTranscript(chessNotation);

        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  });

  // useEffect(() => {
  //   switch (keyDownCounter) {
  //     case 1:
  //       startRecording();
  //       break;
  //     case 2:
  //       stopRecording();
  //       break;
  //     case 3:
  //       submitTranscriptionHandler();
  //       break;
  //     default:
  //       console.log("something went wrong");
  //   }
  // }, [
  //   keyDownCounter,
  //   startRecording,
  //   stopRecording,
  //   submitTranscriptionHandler,
  // ]);

  return (
    <div className='flex flex-row justify-center items-center' id='app'>
      <div className='basis-3/12'>&nbsp;</div>
      <div className='basis-5/12 flex flex-col gap-y-5'>
        <Chessboard />
        <VoiceRecorder
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          audioFile={audioFile}
          submitTranscriptionHandler={submitTranscriptionHandler}
          transcriptData={transcriptData}
          transcript={transcript}
          isLoading={isLoading}
        />
      </div>
      <div className='basis-3/12 ml-20 flex flex-col gap-y-5'>
        <div className='text-white text-3xl font-bold'> {transcript}</div>
        {/* <div className='text-white text-3xl font-bold'>{player}</div> */}
      </div>

    </div>
  );
}

export default App;

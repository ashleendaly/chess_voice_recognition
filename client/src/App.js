import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Chessboard from "./components/Chessboard/Chessboard";
import VoiceRecorder from "./components/VoiceRecorder/VoiceRecorder";
import useVoiceRecorder from "./components/VoiceRecorder/useVoiceRecorder";
import { destructureInput } from "./components/VoiceRecorder/helpers";
import {
  boardNotationToInteger,
  buildPieces,
  buildBoard,
} from "./components/Chessboard/helpers";
import "./App.css";

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
  const [currentPos, setCurrentPos] = useState("");
  const [newPos, setNewPos] = useState("");

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
        const [chessNotation, inputFrom, inputTo] = destructureInput(
          transcriptData.text
        );

        setCurrentPos(inputFrom);
        setNewPos(inputTo);
        // trigger onClick

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

  // -------------------------------------------------------------------

  const pieces = buildPieces();
  const board = buildBoard(pieces);

  const [boardState, setBoardState] = useState(board);

  const movePiece = useCallback(
    (type, currentPosition, newPosition) => {
      const [currentX, currentY] = boardNotationToInteger(currentPosition);
      const [newX, newY] = boardNotationToInteger(newPosition);

      console.table({ currentPosition, currentX, currentY });
      console.table({ newPosition, newX, newY });

      console.log(type);
      console.table(pieces[type]);

      pieces[type].forEach((p) => {
        if (p.x === currentX && p.y === currentY) {
          p.x = newX;
          p.y = newY;
        }
      });

      console.table(pieces[type]);
      const newBoard = buildBoard(pieces);

      setBoardState(newBoard);
    },
    [pieces]
  );

  useEffect(() => {
    movePiece("w", currentPos, newPos);
  }, [movePiece, currentPos, newPos]);

  return (
    <div className='flex flex-row justify-center items-center' id='app'>
      <div className='basis-3/12'>&nbsp;</div>
      <div className='basis-5/12 flex flex-col gap-y-5'>
        <Chessboard boardState={boardState} />
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
        <div className='text-white text-3xl font-bold'>
          current: {currentPos}
        </div>
        <div className='text-white text-3xl font-bold'> move to: {newPos}</div>
      </div>
    </div>
  );
}

export default App;

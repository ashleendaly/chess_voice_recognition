// import Instructions from './components/Instructions/Instructions';
import { useEffect, useState } from "react";
import axios from "axios";
import Chessboard from "./components/Chessboard/Chessboard";
import VoiceRecorder from "./components/VoiceRecorder/VoiceRecorder";
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
  // State variables
  const [chessNotation, setChessNotation] = useState("");

  const [currentPos, setCurrentPos] = useState("");
  const [newPos, setNewPos] = useState("");
  const [type, setType] = useState("w");

  const [audioFile, setAudioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [transcriptID, setTranscriptID] = useState("");
  const [transcriptData, setTranscriptData] = useState("");

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      setTranscriptData("");
      assembly
        .post("/upload", audioFile)
        .then((res) =>
          assembly.post("/transcript", {
            audio_url: res.data.upload_url,
          })
        )
        .then((res) => {
          setTranscriptID(res.data.id);
          checkStatusHandler();
        })
        .catch((err) => console.error(err));
    }
  }, [audioFile]);

  // Check the status of the Transcript
  const checkStatusHandler = () => {
    setIsLoading(true);
    assembly
      .get(`/transcript/${transcriptID}`)
      .then((res) => {
        setTranscriptData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
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

        setChessNotation(chessNotation);

        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  });

  // -------------------------------------------------------------------

  const [pieces, setPieces] = useState(buildPieces());
  const board = buildBoard(pieces);

  const [boardState, setBoardState] = useState(board);

  const movePiece = (type, currentPos, newPos) => {
    const [currentX, currentY] = boardNotationToInteger(currentPos);
    const [newX, newY] = boardNotationToInteger(newPos);

    pieces[type].forEach((p) => {
      if (p.x === currentX && p.y === currentY) {
        p.x = newX;
        p.y = newY;
      }
    });

      console.table({ currentPosition, currentX, currentY });
      console.table({ newPosition, newX, newY });

      console.log(type);
      console.table(pieces[type]);

      if (type === "b"){
        const other_type = "w";
      } else {
        const other_type = "b";
      }

      pieces[type].forEach((p) => {
        if (p.x === currentX && p.y === currentY) {

          pieces[other_type].forEach((captured_p) => {
            if(captured_p.x === newX && captured_p.y === newY) {
             captured_p.x = 10;
             captured_p.y = 10;
            }
          });

          p.x = newX;
          p.y = newY;
        }
      });

    setPieces(pieces);

    const newBoard = buildBoard(pieces);
    setBoardState(newBoard);

    const nextType = type === "w" ? "b" : "w";
    setType(nextType);
  };

  return (
    <div className='flex flex-row justify-center items-center' id='app'>
      <div className='basis-3/12'>&nbsp;</div>
      <div className='basis-5/12 flex flex-col gap-y-5'>
        <Chessboard boardState={boardState} />
        <div className='flex'>
          <VoiceRecorder disabled={isLoading} setAudioFile={setAudioFile} />
          <div
            className={`ml-5 py-4 px-5 bg-red-600 hover:bg-red-800 
            cursor-pointer rounded-full`}
            onClick={() => {
              movePiece(type, currentPos, newPos);
            }}
          >
            @
          </div>
        </div>
      </div>
      <div className='basis-3/12 ml-20 flex flex-col gap-y-5'>
        <div className='text-white text-3xl font-bold'> {chessNotation}</div>
        <div className='text-white text-3xl font-bold'>
          current: {currentPos}
        </div>
        <div className='text-white text-3xl font-bold'> move to: {newPos}</div>
      </div>
    </div>
  );
}

export default App;

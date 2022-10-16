import { useEffect, useState } from "react";
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import Chessboard from "./components/Chessboard/Chessboard";
import VoiceRecorder from "./components/VoiceRecorder/VoiceRecorder";
import Instructions from "./components/Instructions/Instructions";
import { VerticalAxis, HorizontalAxis } from "./components/Axes";
import {
  destructureInput,
  isNotValid,
} from "./components/VoiceRecorder/helpers";
import {
  boardNotationToInteger,
  buildPieces,
  buildBoard,
} from "./components/Chessboard/helpers";
import "./App.css";
import { LoadingIcon } from "./components/VoiceRecorder/icons";

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

  const { speak } = useSpeechSynthesis();

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
        const [moveFrom, moveTo] = destructureInput(transcriptData.text);

        setCurrentPos(moveFrom);
        setNewPos(moveTo);

        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  });

  // -------------------------------------------------------------------

  const [pieces, setPieces] = useState(buildPieces());
  const board = buildBoard(pieces);

  const [boardState, setBoardState] = useState(board);

  const getSpeechSentence = (type, mF, mT) => {
    const phonetic = {
      a: "ay",
      b: "bee",
      c: "cee",
      d: "dee",
      e: "ee",
      f: "ef",
      g: "gee",
      h: "aitch",
    };

    if (isNotValid(mF) || isNotValid(mT)) {
      return "please make a valid move";
    }

    const color = type === "w" ? "white" : "black";
    return `${color} moved from ${phonetic[mF[0]]} ${mF[1]} to ${
      phonetic[mT[0]]
    } ${mT[1]}`;
  };

  const getTextSentence = (mF, mT) => {
    if (mF === "") return "";

    if (isNotValid(mF) || isNotValid(mT)) {
      return "please make a valid move";
    }

    // const color = type === "w" ? "white" : "black";

    return `current move: ${mF} to ${mT}`;
  };

  const movePiece = (type, currentPos, newPos) => {
    const [currentX, currentY] = boardNotationToInteger(currentPos);
    const [newX, newY] = boardNotationToInteger(newPos);

    let other_type = "";
    if (type === "b") {
      other_type = "w";
    } else {
      other_type = "b";
    }

    pieces[type].forEach((p) => {
      if (p.x === currentX && p.y === currentY) {
        pieces[other_type].forEach((captured_p) => {
          if (captured_p.x === newX && captured_p.y === newY) {
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
    <div
      className='pt-20 h-screen flex flex-row justify-evenly items-center'
      id='app'
    >
      <div className='pt-28 h-full'>
        <Instructions />
      </div>
      <div className='flex flex-col gap-y-5 h-full'>
        <div className='flex flex-row'>
          <VerticalAxis vertical={true} />
          <div className='w-max relative'>
            <Chessboard boardState={boardState} />
            <div className='absolute inset-x-0 -bottom-28 flex justify-center'>
              {isLoading ? (
                <LoadingIcon />
              ) : (
                <div className='flex flex-row gap-x-5'>
                  <div className='text-white text-3xl font-bold'>
                    {getTextSentence(currentPos, newPos)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <HorizontalAxis />
      </div>
      <div className='h-full flex flex-col gap-y-5'>
        <div className='flex flex-col justify-center'>
          <div className='mb-16 flex justify-center' id='card'>
            <img
              className='w-32 h-32'
              src={
                type === "w"
                  ? "/assets/images/king_w.png"
                  : "/assets/images/king_b.png"
              }
              alt={"..."}
            />
          </div>
          <VoiceRecorder
            disabled={isLoading}
            setAudioFile={setAudioFile}
            makeMove={() => {
              movePiece(type, currentPos, newPos);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

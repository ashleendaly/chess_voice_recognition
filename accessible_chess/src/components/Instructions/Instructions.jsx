import "./Instructions.css";

const Instructions = () => {
  return (
    <div id='instructions'>
      <div className='mb-2 text-3xl font-bold'> How To Play </div>
      <div className='ml-1 flex flex-col gap-y-2'>
        <li className='list-decimal'>
          Press space and say your command into the microphone.
        </li>
        <li className='list-decimal'>
          Press space to end the command recording.
        </li>
        <li className='list-decimal'> Press space to submit your command. </li>
      </div>

      <div className='mt-4 text-xl font-bold'> Voice Command Format </div>
      <p id='italic'> "Piece + Position + to + NewPosition" </p>
      <div className='mt-3 text-base font-bold'> Example </div>
      <p id='italic'> "Rook a1 to a7" </p>
    </div>
  );
};

export default Instructions;

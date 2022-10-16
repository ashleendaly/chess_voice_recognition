import "./Instructions.css";

const Instructions = () => {
  return (
    <div id='instructions'>
      <div className='mb-2 text-3xl font-bold'> How To Play </div>
      <div className='ml-1 flex flex-col gap-y-2'>
        <li className='list-decimal'>Press D or J to record your move.</li>
        <li className='list-decimal'>
          Press F or K to end the recording process.
        </li>
        <li className='list-decimal'> Press space to play your move. </li>
      </div>

      <div className='mt-4 text-xl font-bold'> Voice Command Format </div>
      <p id='italic'> "Move + Position + To + NewPosition" </p>
      <div className='mt-3 text-base font-bold'> Example </div>
      <p id='italic'> "Move a1 to a7" </p>
    </div>
  );
};

export default Instructions;

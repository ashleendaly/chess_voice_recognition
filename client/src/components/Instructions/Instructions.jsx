import "./Instructions.css";


const Instructions = () => {

return (
    <div id="instructions">
        <h1 > How To Play </h1>
        <ol>
            <li> Press space and say your command into the microphone. </li>
            <li> Press space to end the command recording. </li>
            <li> Press space to submit your command. </li>
        </ol>

        <h2> Voice Command Format </h2>
        <p id="italic"> "Piece + Position + to + NewPosition" </p>
        <h4> Example </h4>
        <p id="italic" > "Rook a1 to a7" </p>
    </div>
)


}

export default Instructions
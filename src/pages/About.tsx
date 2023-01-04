import { useRef, useState } from "react";

let About = () => {

    //! The displayed piano keys
    let [keys] = useState([
        <span className="white">a</span>,
        <span className="black">w</span>,
        <span className="white">s</span>,
        <span className="black">e</span>,
        <span className="white">d</span>,
        <span className="white">f</span>,
        <span className="black">t</span>,
        <span className="white">g</span>,
        <span className="black">y</span>,
        <span className="white">h</span>,
        <span className="black">u</span>,
        <span className="white">j</span>,
        <span className="white">k</span>,
        <span className="black">o</span>,
        <span className="white">l</span>,
        <span className="black">p</span>,
        <span className="white">;</span>,
    ]);

    //! State for showing & hiding the pianoKeys letters.
    let [isLettersShown, setIsLettersShown] = useState<boolean>(true);

    //! State to add class to the key when clicking the keyboard that has tune that matches it.
    // let [isActive, setIsActive] = useState<boolean>(false); Didn't work


    let audio = new Audio("");

    //* play each key's tune when clicking on the key
    let playTune = (key: JSX.Element) => {
        audio.src = `audios/${key.props.children}.wav`;
        audio.play();
    }

    //! The range input
    let volumeSlider = useRef<HTMLInputElement>(null);

    //* Controlling the volume of the tunes
    let volumeControl = () => {
        audio.volume = volumeSlider.current?.valueAsNumber!;
    }

    //* When clicking the keyboard button play tune
    document.onkeydown = (e: KeyboardEvent) => {

        keys.forEach(key => {

            //* Only run when the clicked keyboardKey is one of the tunes
            if (e.key === key.props.children) {
                audio.src = `audios/${e.key}.wav`;
                audio.play();
            }
        })
    }

    return (
        <div className="About">

            <div className="piano">

                <header>

                    <h2>React Piano</h2>

                    <div className="volume">
                        <label htmlFor="volumeSlider">Volume</label>
                        <input type="range" id="volumeSlider" ref={volumeSlider} onInput={() => { volumeControl() }}
                            min="0" max="1" step="any" defaultValue="0.5"
                        />
                    </div>

                    <div className="checking">
                        <label htmlFor="checkbox">Show keys</label>
                        <input type="checkbox" defaultChecked onClick={() => setIsLettersShown(!isLettersShown)} />
                    </div>

                </header>

                {/* //* show & hide the keyboard letters  */}
                <div className={isLettersShown ? "bottom" : "bottom hide"}>
                    {
                        keys.map(key => (
                            <div className="key" key={key.props.children} onClick={() => playTune(key)} >
                                {key}
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    );
}

export default About;
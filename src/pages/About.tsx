import { ChangeEvent, useState } from "react";

let About = () => {

    //* The keyboard letters inside an array
    //* So I display them in the jsx by looping through them
    let [letters, setLetters] = useState<string[]>([
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s",
        "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"
    ])


    //* State for holding the displayed letters
    let [element, setElement] = useState<string>("");

    //* Condition for showing or covering the keyboard
    //* It triggers after a user clicks on the enter button
    let [isTrue, setIsTrue] = useState<boolean>(false);

    //? Check if the letters are already uppercase then turn them to lowercase , and reverse
    function isUpperCase(str: string) {

        //* Returns true if the parameter is uppercase  , and false if it's lowercase
        return str === str.toUpperCase();
    }

    return (
        <div className="About">

            <input type="text" value={element} onChange={(e: ChangeEvent<HTMLInputElement>) => setElement(e.target.value)} />


            {/* ----------------------keyboard--------------------------- */}
            <div className={isTrue ? "done" : "keyboard"}>

                {/* //* Turn letters to uppercase and reverse button */}
                <div className="letter uppercase" onClick={() => {
                    setLetters(
                        letters.map((letter) => {

                            //? Check if the letters are already uppercase turn them to lowercase , and reverse
                            if (isUpperCase(letter)) {
                                return letter = letter.toLocaleLowerCase()!;
                            }
                            else {
                                return letter = letter.toUpperCase()!;
                            }
                        })
                    )
                }}>
                    uppercase
                </div>

                {/* //* Displaying the letters */}
                {
                    letters.map(one => (
                        <div className="letter" key={one} onClick={() => { setElement(element + one); }}>
                            {one}
                        </div>
                    ))
                }

                {/* //* delete a letter */}
                <div className="letter delete" onClick={() => setElement(element.toString().slice(0, -1))}>
                    delete
                </div>

                {/* //* Adding space */}
                <div className="letter space" onClick={() => setElement(element + " ")}>
                </div>

                {/* // enter button */}
                <div className="letter enter" onClick={() => { setIsTrue(true) }}>
                    enter
                </div>


            </div>
            {/* ----------------------keyboard--------------------------- */}


        </div>
    );
}

export default About;
import { useEffect, useRef, useState } from "react";

interface SongsList {
    id: number,
    song: string,
    singer: string,
    img: string,
    audio: string
}

const About = () => {

    //! The musics as a data from a database
    let [music] = useState<SongsList[]>([
        { id: 0, song: "First Song-Clip", singer: "Arthur Shelby", img: "music-1.jpg", audio: "music-1.mp3" },
        { id: 1, song: "Second Song-Clip", singer: "Jessica Pearson", img: "music-2.jpg", audio: "music-2.mp3" },
        { id: 2, song: "Third Song-Clip", singer: "Michael James", img: "music-3.jpg", audio: "music-3.mp3" },
        { id: 3, song: "Fourth Song-Clip", singer: "Jane Lopez", img: "music-4.jpg", audio: "music-4.mp3" },
        { id: 4, song: "Fifth Song-Clip", singer: "Frank Kassel", img: "music-5.jpg", audio: "music-5.mp3" },
        { id: 5, song: "Sixth Song-Clip", singer: "Leonardo Shelby", img: "music-6.jpg", audio: "music-6.mp3" },
    ]);

    //! The audio element
    let audio = useRef<HTMLAudioElement>(null);

    //! The slider element
    let slider = useRef<HTMLInputElement>(null);

    //! State to navigate between the songs.
    //* its initial value between 0 and 6
    let [id, setId] = useState<number>(Math.floor(Math.random() * 6));

    //! State to open the songs list
    let [isPlaylist, setIsPlaylist] = useState<boolean>(false);

    let [isLoop, setIsLoop] = useState<boolean>(false);

    //* When clicking on a song make it the current song 
    let selectSong = (one: SongsList) => {

        setIsPlaylist(false);
        setId(one.id);
        setIsPlaying(true);
    }

    //* Go to the previous song
    let playPrevious = () => {
        id == 0 ? null : setId(id => id - 1);
        setIsPlaying(true);
    }

    //* Go to the next song
    let playNext = () => {
        id == music.length - 1 ? null : setId(id => id + 1);
        setIsPlaying(true);
    }

    //! State to check if the music is playing
    let [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        //? Run the music or stop it depending on the isPlaying state.
        isPlaying ? audio.current?.play() : audio.current?.pause();

    }, [isPlaying])

    //? Make the song in a loop,  depending on the isLoop state.
    if (audio.current) {
        isLoop ? audio.current.loop = true : audio.current.loop = false;
    }

    let [currentTime, setCurrentTime] = useState<number>(0)

    //! The slider represents audio's progress.
    //* The purpose of the Timeout is to get the duration of the audio Because we don't immediately get it in the initial render.
    setTimeout(() => {
        if (audio.current && slider.current) {

            //* Setting the max value of the slider to the duration of the audio
            slider.current.max = Math.floor(audio.current.duration).toString();

            //* When changing the slider => change the currentTime of the audio 
            slider.current.oninput = () => {
                audio.current!.currentTime = slider.current!.valueAsNumber;
                setIsPlaying(true)
                setCurrentTime(audio.current!.currentTime)
            }

            //* Updates the slider's value , to currentTime of the audio
            setInterval(() => {
                slider.current!.valueAsNumber = audio.current!.currentTime;
                // setCurrentTime(audio.current!.currentTime);

            }, 4000)
        }
    }, 3000)

    return (
        <div className="About">
            <div className="container">

                <div className="top">

                    <span className="material-symbols-outlined" id="icon">
                        expand_more
                    </span>

                    <h3>Now Playing</h3>

                    <span className="material-symbols-outlined" id="icon">
                        more_horiz
                    </span>
                </div>

                {/*//! Displaying the current music */}
                <div className="middle">
                    <img src={`images/${music[id].img}`} alt="img" />

                    <h3> {music[id].song} </h3>
                    <h4> {music[id].singer} </h4>

                    <audio ref={audio} src={`audios/${music[id].audio}`} autoPlay />
                    <input type="range" ref={slider} defaultValue={0} />

                    <div>
                        <span className="first">
                            {Math.floor(currentTime)}
                        </span>
                        <span className="second">
                            {audio.current && Math.floor(audio.current.duration)}
                        </span>

                    </div>

                </div>

                {/* //! Controlling the current song  */}
                <div className="down">

                    {/* Make the song in a loop */}
                    <span className="material-symbols-outlined" id="loop" onClick={() => setIsLoop(!isLoop)}>
                        {isLoop ? "repeat" : "all_inclusive"}
                    </span>

                    <span className="material-symbols-outlined" id="PlayLeft" onClick={playPrevious}>
                        keyboard_double_arrow_left
                    </span>

                    {/* //* Play music , Stop music */}
                    <span className="material-symbols-outlined" id="play" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? "pause" : "play_arrow"}
                    </span>

                    <span className="material-symbols-outlined" id="PlayRight" onClick={playNext} >
                        keyboard_double_arrow_right
                    </span>

                    {/* Button to open the MusicList  */}
                    <span className="material-symbols-outlined" id="playlist" onClick={() => setIsPlaylist(true)}>
                        queue_music
                    </span>
                </div>


                {/*//! The songs list */}
                <div className={isPlaylist ? "musicList" : "musicList hide"}>

                    <div className="header">
                        <span className="material-symbols-outlined" id="icon">
                            queue_music
                        </span>
                        <h3>Music list</h3>

                        {/* Button to close the MusicList  */}
                        <span className="material-symbols-outlined" id="close" onClick={() => setIsPlaylist(false)}>
                            close
                        </span>
                    </div>

                    <div className="musics">
                        {music.map(one => (

                            //* When clicking on a song make it the current song 
                            <div className="music" key={one.id} onClick={() => { selectSong(one) }}>
                                <h3> {one.song} </h3>
                                <h4> {one.singer} </h4>

                                <span> {one.id === id ? "Playing..." : ""} </span>
                            </div>
                        ))}
                    </div>

                </div>

            </div>


        </div>
    );
}

export default About;

/** 
 * todo Visual studio code features:
 * !1 ctrl + p => '">" for commands' , '" " for files' , '"@" for specific code in current file'.
 * !2 in the CLI write code "file name" to create a file in the current directory. or create it in new directory. 
 * !3 ctrl + f => to search based on key wards in your file.
 * !4 header>nav>ul>li*3 to generate the children elements.
 * !5 header>nav>ul>li*5{their text} to generate the children elements with there values.
 * !6 (header>h1)+main+footer to create a siblings.
 * 
 * * Close a file.  ctrl + w
 * * Open explorer. ctrl + b
 * * Highlight line ctrl + l  
 * * Highlight line ctrl + right , left , top , down   
 * * Scrolling      ctrl + top , down
 * * Navigating     ctrl + tab     
*/

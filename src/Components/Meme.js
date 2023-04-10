import React from "react";

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setallMemes] = React.useState({})

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(result => result.json())
            .then(result => setallMemes(result.data.memes))
    }, [])
    
    function handleChange(event){
        const {name, value} = event.target;
        setMeme(prevMeme => (
        {   
            ...prevMeme,
            [name]: value
        }
        ))
    }

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => (
            {
                ...prevMeme,
                randomImage: url
            }
        ))
        
    }
    return (
        <main>
            <div className="input-line">
                <input type="text" id="line-1" name="topText" placeholder="meme-line-1" value={meme.topText} onChange={handleChange}/>
                <input type="text" id="line-2" name="bottomText" placeholder="meme-line-2" value={meme.bottomText} onChange={handleChange}/>
            </div>
                
            <button id="submit-btn" onClick={getMemeImage}>Get a new meme image 🖼️</button>
            <div className="meme">
                <img src={meme.randomImage} alt="meme-random" className="meme-img"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
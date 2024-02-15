import { useState, useEffect } from "react";
import YouTube from "react-youtube";

const Hero = ({text, backdrop, description, posterUrl, trailer}) => {

    // const [showButton, setShowButton] = useState(false)
    const [openTrailer, setOpenTrailer] = useState(true)   
     
    
    // const handleTrailer = () => {
    //     return(
    //         setOpenTrailer(current => !current)
    //     )      
    // }

    // useEffect( () => {
    //     console.log(openTrailer);
    //     setShowButton(true);

    // }, [openTrailer]);


    return(
        <main>
            <div className="bg-dark text-white p-5 hero-container hero-backdrop"
            style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${backdrop})`}}>
                    {openTrailer? 
                        <div>
                            {trailer}
                            <button className="button close-video" onClick={() => setOpenTrailer(false)}>Close</button>
                        </div> 
                        : 
                        <div className="hero-content">
                            <div className="poster_img">
                                <img src={posterUrl} alt= "Poster" className="img-fluid shadow rounded" />
                            </div>
                            {trailer ? 
                            <div>
                                <h1>{text}</h1>
                                <p>{description}</p>
                                <button className="button play-video" onClick={() => setOpenTrailer(true)}>Play Trailer</button>
                            </div>
                            :
                            <div>
                                <h1>{text}</h1>
                                <p>{description}</p>
                                <p className="highlight">Sorry, no trailer available</p>
                            </div>
                            }
                        </div>                   
                    }


             </div>
        </main>
        
    )
}
export default Hero;
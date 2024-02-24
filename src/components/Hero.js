import { useState, useEffect } from "react";

const Hero = ({ text, backdrop, description, posterUrl, trailer }) => {
    const [openTrailer, setOpenTrailer] = useState(true)


    useEffect(() => {
        if (trailer === null || trailer === undefined) {
            setOpenTrailer(false);
        }
        else {
            setOpenTrailer(true);
        }
    }, [trailer]);
    return (
        <main>
            <div className="bg-dark text-white p-5 hero-container hero-backdrop"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,1) 100%), url(${backdrop})` }}>
                {openTrailer ?
                    <div>
                        {trailer}
                        <button className="button close-video" onClick={() => setOpenTrailer(false)}>Close</button>
                    </div>
                    :
                    <div className="hero-content">
                        {/* <div className="poster_img">
                                <img src={posterUrl} alt= "Poster" className="img-fluid shadow rounded" />
                            </div> */}
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
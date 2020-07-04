import React, {useState } from 'react'
import {Col} from 'antd';
import {IMAGE_BASE_URL } from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import CastDetails from '../views/MovieDetail/CastDetails'

function GridCards(props) {

    let { actor, key, image, movieId, movieName, actorId, actorName, characterName, movieRate } = props
    const POSTER_SIZE = "w154";
    const [show, setShow] = useState(false)

    if (actor) {
        
        const showActorDetails = () => {
            setShow(!show)
        }

        return (
            <Col key={key} lg={4} md={6} xs={8}>
                <div className="profile" style={{ position: 'relative' }}>
                    <img style={{ width: '100%', height: '100%' }} alt={actorName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} onClick={showActorDetails}/>
                    {show && 
                        <CastDetails actorName={actorName} characterName={characterName} showActorDetails={showActorDetails}
                                    show={show} image={image} actorId={actorId}                
                        />
                    }       
                </div>
            </Col>
            
        )
    } else {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${movieId}`} >
                        <img style={{ width: '100%', height: '320px' }} alt={movieName} src={image} />
                
                    </a>
                    <p style={{color:"grey", textAlign:"center"}}>{movieName.substring(0,30)}<br/> Rating: {movieRate}</p>
                    
                </div>
            </Col>
        )
    }

}

export default GridCards

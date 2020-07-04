import React, { useEffect, useState } from 'react'
import {API_URL, IMAGE_BASE_URL, API_KEY } from '../../Config';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function GridCards(props) {

    let {image, actorId, actorName, characterName, show,showActorDetails } = props
    const POSTER_SIZE2 = "h632";
    //const [show, setShow] = useState(false)
    const [Actor, setActor] = useState([])

        useEffect(() => {

            let endpointForActroInfo = `${API_URL}person/${actorId}?api_key=${API_KEY}&language=en-US`;
            fetchActorInfo(endpointForActroInfo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    
        const fetchActorInfo = (endpoint) => {
    
            fetch(endpoint)
                .then(result => result.json())
                .then(result => {
                    setActor(result)
                })
                .catch(error => console.error('Error:', error)
                )
        }
        
        return (

            <Modal show={show} onHide={showActorDetails}>
            <Modal.Header closeButton>
                <Modal.Title>{characterName} <span style={{color:"grey"}}> - Acted By: </span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{color:"grey", textAlign:"center"}}> {actorName} </p>
                <img style={{ width: '100%', height: '650px' }} alt={actorName} src={`${IMAGE_BASE_URL}${POSTER_SIZE2}${image}`}/>
                {Actor && Actor.biography &&
                <p style={{color:"black", fontWeight:"bold"}}>Biography: <span style={{color:"grey"}}> {Actor.biography} </span></p>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={showActorDetails}>
                Close
                </Button>
            </Modal.Footer>
            </Modal>
        )
}

export default GridCards

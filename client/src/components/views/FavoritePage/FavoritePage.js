import React, { useEffect, useState } from 'react'
import { Typography, Popover, Button} from 'antd';
import axios from 'axios';
import './favorite.css';
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../Config'
import { NavLink } from 'react-router-dom';

const { Title } = Typography;

function FavoritePage() {
    const user = useSelector(state => state.user)

    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavoredMovie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    }


    const renderCards = Favorites.map((favorite, index) => {


        const content = (
            <div  className="popover">
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} alt=""/>
                    : "no image"}
            </div>
        );

        return <tr key={index}>
            
            <td>
            <NavLink exact to={`/movie/${favorite.movieId}`}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                {favorite.movieTitle}
            </Popover>
            </NavLink>
            </td>
            

            <td>{favorite.movieRunTime} mins</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)} style={{backgroundColor: "#f5dcdc", color:"red"}}> Delete </Button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            {user.userData && !user.userData.isAuth ?
                <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Please Log in first...</p>
                    <a href="/login">Go to Login page</a>
                </div>
                :
                !Loading &&
                <div>
                    
                    <Title level={2}>Enjoy your favorite movies!</Title>
                <hr />
                   
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title ({Favorites.length} in total)</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
                </div>
            }
        </div>
    )
}

export default FavoritePage

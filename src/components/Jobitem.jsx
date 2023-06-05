import PropTypes from 'prop-types'
import {  useState } from 'react';
import { Link } from 'react-router-dom';
import location from '../assets/Location.svg'
export default function Jobitem({vacancy: {payment_from, payment_to, profession, currency, type_of_work, town, id}}) {
  const [isFavorite, setIsFavorite] = useState((JSON.parse(localStorage.getItem('favorites')) || []).includes(`${id}`) || false)

  function handleFavorite() {

    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    
    if(isFavorite) {
      const newFavorites = favorites.filter(item => item !== `${id}`)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    } else {
      const newFavorites = [...favorites, `${id}`]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
    setIsFavorite(!isFavorite)
  }
  return (
    
    <div data-elem={`vacancy-${id}`} className="vacancy_item">
      <div className="vacancy_content">
        <h2>
          <Link to={`/vacancy/${id}`} className='vacancy_title'>{profession}</Link>
        </h2>
        <div className="vacancy_details">
          <span className='vacancy_payment'>з/п от {payment_from} {!payment_to ? '' : '- ' + payment_to} {currency}</span>
          <span> • </span>
          <span>{type_of_work.title}</span>
        </div>
        <p className='vacancy_location'>
          <img src={location} />
          <span>{town.title}</span>
        </p>
      </div>
      <button data-elem={`vacancy-${id}-shortlist-button`} onClick={handleFavorite} className={isFavorite ? 'favorite_button select': 'favorite_button'}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" stroke="" strokeWidth="1.5"/>
      </svg>
      </button>
    </div>
  );
}

Jobitem.propTypes = {
    vacancy: PropTypes.object,
  }
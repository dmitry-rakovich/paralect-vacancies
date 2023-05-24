import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import location from '../assets/Location.svg'

export default function Vacancy() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites"))?.includes(id) || false
  );
  useEffect(() => {
    const { token_type, access_token } = JSON.parse(
      localStorage.getItem("paralect_token")
    );
    fetch(import.meta.env.VITE_URL + `vacancies/${id}/`, {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY,
        "X-Api-App-Id": import.meta.env.VITE_APP_ID,
        Authorization: `${token_type} ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setVacancy(data));
  }, [id]);
  useEffect(() => {
    document.title = `Вакансия ${id}`;
  }, []);

  function handleFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const newFavorites = JSON.stringify([
        ...favorites.filter((item) => item !== id),
      ]);
      localStorage.setItem("favorites", newFavorites);
      setIsFavorite(false);
    } else {
      const newFavorites = JSON.stringify([...favorites, id]);
      localStorage.setItem("favorites", newFavorites);
      setIsFavorite(true);
    }
    setIsFavorite(!isFavorite);
  }
  return (
    <>
      {vacancy && (
        <div className="vacancy_wrapper">
          <>
            <div className="vacancy_item">
              <div className="full_vacancy_content">
                <h2 className="full_vacancy_title">
                  {vacancy.profession}
                </h2>
                <div className="full_vacancy_details">
                  <span className="full_vacancy_payment">
                    з/п от {vacancy.payment_from}{" "}
                    {!vacancy.payment_to ? "" : "- " + vacancy.payment_to}{" "}
                    {vacancy.currency}
                  </span>
                  <span> • </span>
                  <span>{vacancy.type_of_work.title}</span>
                </div>
                <p className="vacancy_location">
                  <img src={location} />
                  <span>{vacancy.town.title}</span>
                </p>
              </div>
              <svg
                data-elem={`vacancy-${id}-shortlist-button`}
                onClick={handleFavorite}
                className={
                  isFavorite ? "favorite_button select" : "favorite_button"
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z"
                  stroke=""
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className="vacancy_item">{vacancy.vacancyRichText}</div>
          </>
        </div>
      )}
    </>
  );
}

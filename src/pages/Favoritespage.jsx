import { useEffect, useState } from "react";
import Jobitem from "../components/Jobitem";
import Emptypage from "./Emptypage";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

export default function Favoritespage() {
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(500);
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []

  useEffect(() => {
    document.title = "Избранное";
    const paramString = favorites.join("&ids[]=") + `&${new URLSearchParams ({
      count: 4,
      page: page,
    })}` ;
      const { token_type, access_token } = JSON.parse(
        localStorage.getItem("paralect_token")
      );
    fetch(import.meta.env.VITE_URL + "vacancies/?&ids[]=" + paramString, {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY,
        "X-Api-App-Id": import.meta.env.VITE_APP_ID,
        Authorization: `${token_type} ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVacancies(data.objects)
        setTotal(data.total)
      })
      .then(() => setIsLoading(false));
  }, [page]);

  return (
    <div className="vacancy_wrapper">
      {isLoading ? (
        <Loader />
      ) : vacancies.length > 0 ? (
        <>
        {

          vacancies.map((vacancy) => (
            <Jobitem
            key={vacancy.id}
            vacancy={vacancy}
            />
            ))
          }
        <Pagination total={total} setPage={setPage} />
            </>
        
      ) : (
        <Emptypage />
      )}
      {/* <Pagination total={total} setPage={setPage} /> */}
    </div>
  );
}

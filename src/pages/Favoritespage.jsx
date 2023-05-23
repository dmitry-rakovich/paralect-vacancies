import { useEffect, useState } from "react";
import Jobitem from "../components/Jobitem";
import Emptypage from "./Emptypage";
import Loader from "../components/Loader";

export default function Favoritespage() {
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Избранное";
    const paramString =
      JSON.parse(localStorage.getItem("favorites"))?.join("&ids[]=") || "";
    fetch(import.meta.env.VITE_URL + "vacancies/?&ids[]=" + paramString, {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY,
        "X-Api-App-Id": import.meta.env.VITE_APP_ID,
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setVacancies(data.objects))
      .then(() => setIsLoading(false));
  }, []);

  async function getVacancies() {}
  return (
    <div className="vacancy_wrapper">
      {isLoading ? (
        <Loader />
      ) : vacancies.length > 0 ? (
        vacancies.map((vacancy) => (
          <Jobitem
            key={vacancy.id}
            vacancy={vacancy}
            getVacancies={getVacancies}
          />
        ))
      ) : (
        <Emptypage />
      )}
    </div>
  );
}

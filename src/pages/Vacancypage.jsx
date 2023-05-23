import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Jobitem from "../components/Jobitem";
import Emptypage from "./Emptypage";

export default function Vacancy() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    fetch(import.meta.env.VITE_URL + `vacancies/${id}/`, {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY,
        "X-Api-App-Id": import.meta.env.VITE_APP_ID,
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setVacancy(data));
  }, [id]);
  useEffect(() => {
    document.title = `Вакансия ${id}`;
  }, []);

  return (
    <>
      {vacancy && (
        <div className="vacancy_wrapper">
          {isEmpty ? <Emptypage/> : 
          <>
          <Jobitem
            vacancy={vacancy}
            getVacancies={() => setIsEmpty(true)}
            />
          <div className="vacancy_item">{vacancy?.vacancyRichText}</div>
          </>}
        </div>
      )}
    </>
  );
}

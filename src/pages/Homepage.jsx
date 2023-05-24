import { useEffect, useState } from "react";
import Jobitem from "../components/Jobitem";
import search from "../assets/Search.svg";
import Emptypage from "./Emptypage";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";

export default function Homepage() {
  const [vacancies, setVacancies] = useState([]);
  const [currentCategorie, setCurrentCategorie] = useState("");
  const [keyword, setKeyword] = useState("");
  const [paymentFrom, setPaymentFrom] = useState('');
  const [paymentTo, setPaymentTo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    document.title = "Поиск Вакансий";
  }, []);
  useEffect(() => {
    getVacancies();
  }, [page]);
  async function getVacancies() {
    setIsLoading(true)
    const paramString = new URLSearchParams({
      count: 4,
      page: page,
      published: 1,
      keyword,
      payment_from: paymentFrom,
      payment_to: paymentTo,
      catalogues: currentCategorie,
    });
    const { token_type, access_token } = JSON.parse(
      localStorage.getItem("paralect_token")
    );
    fetch(import.meta.env.VITE_URL + "vacancies/?" + paramString, {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY,
        "X-Api-App-Id": import.meta.env.VITE_APP_ID,
        Authorization: `${token_type} ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setVacancies(data.objects))
      .then(() => setIsLoading(false));
  }

  return (
    <>
      <Filter
        setCurrentCategorie={setCurrentCategorie}
        setKeyword={setKeyword}
        setPaymentFrom={setPaymentFrom}
        setPaymentTo={setPaymentTo}
        paymentFrom={paymentFrom}
        paymentTo={paymentTo}
        currentCategorie={currentCategorie}
        getVacancies={getVacancies}
      />
      <div className="vacancy_wrapper">
        <div className="search_block">
          <img src={search} alt="" />
          <input
            data-elem="search-input"
            type="search"
            placeholder="Введите название вакансии"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button data-elem="search-button" className="button" onClick={getVacancies}>
            Поиск
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : vacancies.length > 0 ? (
          <>
            {vacancies.map((vacancy) => (
              <Jobitem
                key={vacancy.id}
                vacancy={vacancy}
              />
            ))}
            <Pagination page={page} setPage={setPage} />
          </>
        ) : (
          <Emptypage />
        )}
      </div>
    </>
  );
}

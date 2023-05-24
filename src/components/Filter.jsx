import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

function Filter({getVacancies, setKeyword, setPaymentFrom, setPaymentTo, setCurrentCategorie, paymentFrom, paymentTo, currentCategorie}) {
  const [catalogues, setCatalogues] = useState([]);

  function handleReset() {
    setCurrentCategorie("");
    setKeyword("");
    setPaymentFrom("");
    setPaymentTo("");
  }

  useEffect(() => {
    getCatalogues();
  }, []);
  function getCatalogues() {
    const {token_type, access_token} = JSON.parse(localStorage.getItem('paralect_token'))
    fetch(import.meta.env.VITE_URL + "catalogues/", {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY,
        "X-Api-App-Id": import.meta.env.VITE_APP_ID,
        Authorization: `${token_type} ${access_token}`,
      },
    }).then((res) => res.json()).then((data) => setCatalogues(data))
  }
  return (
    <div
    className="filter"
  >
    <div className="filter_header">
      <h2 className="filter_title">Фильтры</h2>
      <button className="filter_reset_button" onClick={handleReset}>
        Сбросить всё &times;
      </button>
    </div>
    <div className="filter_content">
    <label>
    <h3>Отрасль</h3>
    <select
      data-elem="industry-select"
      value={currentCategorie}
      onChange={(e) => {
        setCurrentCategorie(e.target.value);
      }}
    >
      <option value="">Выберите отрасль</option>
      {catalogues.map((item) => (
        <option key={item.key} value={item.key}>
          {item.title}
        </option>
      ))}
    </select>
      </label>
    <label>
      <h3>Оклад</h3>
    <input
      data-elem="salary-from-input"
      type="number"
      min="0"
      step="1000"
      placeholder="От"
      value={paymentFrom}
      onChange={(e) => setPaymentFrom(e.target.value)}
      />
    <input
      data-elem="salary-to-input"
      type="number"
      min="0"
      step="1000"
      placeholder="До"
      value={paymentTo}
      onChange={(e) => setPaymentTo(e.target.value)}
      />
      </label>
    <button data-elem="search-button" className="button" onClick={getVacancies}>
      Применить
    </button>
    </div>
  </div>
  );
}
Filter.propTypes = {
  getVacancies: PropTypes.func,
  setKeyword: PropTypes.func,
  setPaymentFrom: PropTypes.func,
  setPaymentTo: PropTypes.func,
  setCurrentCategorie: PropTypes.func,
  paymentFrom: PropTypes.string,
  paymentTo: PropTypes.string,
  currentCategorie: PropTypes.string
}

export default Filter;

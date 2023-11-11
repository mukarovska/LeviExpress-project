import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({ cities }) => {
  return (
    <>
      <option value={''}>Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.name}>
          {city.name}
        </option>
      ))}
    </>
  );
};

const DatesOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => {
        return (
          <option key={date.dateBasic} value={date.dateCs}>
            {date.dateCs}
          </option>
        );
      })}
    </>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const responseCity = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const dataCity = await responseCity.json();
      setCities(dataCity.results);

      const responseDate = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const dataDates = await responseDate.json();
      setDates(dataDates.results);
    };
    handleFetch();
    console.log('useEffect');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('odesilam formular s cestou');
    console.log('From city', fromCity);
    console.log('To city', toCity);
    console.log('Date', date);
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(e) => {
                setFromCity(e.target.value);
              }}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              value={toCity}
              onChange={(e) => {
                setToCity(e.target.value);
              }}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            >
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';

export const ReservationPage = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  useEffect(() => {
    const handleFetch = async () => {
      const responseTicket = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/reservation?id=${id}`,
      );
      const dataTicket = await responseTicket.json();
      console.log('dataTicket', dataTicket.results);
      setReservation(dataTicket.results);
    };
    handleFetch();
  }, []);
  return (
    <div>
      {reservation !== null ? (
        <div className="reservation container">
          <h2>Vaše e-jízdenka č. {reservation.reservationId}</h2>
          <div className="reservation__body">
            <div className="reservation__headings">
              <p>Datum cesty:</p>
              <p>Odjezd:</p>
              <p>Příjezd:</p>
              <p>Sedadlo:</p>
            </div>
            <div className="reservation__info">
              <p>{reservation.date}</p>
              <p>
                {reservation.fromCity.name}, {reservation.fromCity.time}
              </p>
              <p>
                {reservation.toCity.name}, {reservation.toCity.time}
              </p>
              <p>{reservation.seatNumber}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

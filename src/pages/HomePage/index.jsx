import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { SelectedSeat } from '../../components/SelectedSeat';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const [journey, setJourney] = useState(null);
  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
  };

  const handleBuy = async () => {
    const responseBuy = await fetch(
      'https://apps.kodim.cz/daweb/leviexpress/api/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          seat: journey.results.autoSeat,
          journeyId: journey.results.journeyId,
        }),
      },
    );

    const dataBuy = await responseBuy.json();
    const reservationId = dataBuy.results.reservationId;
    navigate(`/reservation/${reservationId}`);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey !== null ? (
        <>
          {' '}
          <JourneyDetail journey={journey.results} />{' '}
          <SelectedSeat number={journey.results.autoSeat} />
        </>
      ) : null}
      <div className="controls container">
        <button onClick={handleBuy} className="btn btn--big" type="button">
          Rezervovat
        </button>
      </div>
    </main>
  );
};

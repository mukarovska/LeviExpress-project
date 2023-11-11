import { BusStop } from '../BusStop';
import './style.css';

export const JourneyDetail = ({ journey }) => {
  console.log('Property journey', journey);
  return (
    <div className="journey-detail container">
      <h2>Podrobnosti cesty</h2>
      <div className="stops">
        {journey.stops.map((stop) => {
          return (
            <BusStop
              key={stop.code}
              name={stop.name}
              station={stop.station}
              time={stop.time}
            />
          );
        })}
      </div>
    </div>
  );
};

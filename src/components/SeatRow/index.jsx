import { Seat } from '../Seat';

export const SeatRow = ({ row }) => {
  return (
    <div className="seat-row">
      {row.map((seat) => {
        return (
          <Seat
            key={seat.number}
            number={seat.number}
            isOccupied={seat.isOccupied}
          />
        );
      })}
    </div>
  );
};

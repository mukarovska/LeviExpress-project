import { Seat } from '../Seat';

export const SeatRow = ({ row, rowSelectedSeat }) => {
  return (
    <div className="seat-row">
      {row.map((seat) => {
        return (
          <Seat
            isSelected={rowSelectedSeat === seat.number}
            key={seat.number}
            number={seat.number}
            isOccupied={seat.isOccupied}
          />
        );
      })}
    </div>
  );
};

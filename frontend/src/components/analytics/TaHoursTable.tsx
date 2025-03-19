export const TaHoursTable = ({ hours }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>TA</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((TA, index) => (
            <tr key={index}>
              <td>{TA.name}</td>
              <td>{TA.numhours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

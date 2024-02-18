export default function Table({ data }) {
  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-black text-base">
            <th>Created</th>
            <th>Date from - Date to</th>
            <th>Guests</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item.id} className="text-base">
                {" "}
                {/* Make sure to add a unique key prop */}
                <td>{item.created}</td>
                <td>{`${item.dateFrom} - ${item.dateTo}`}</td>{" "}
                {/* Assuming you have a dateTo field */}
                <td>{item.guests}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

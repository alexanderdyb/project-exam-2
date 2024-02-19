import formatDate from "../../hooks/useFormatDate";

export default function Table({ data }) {
  return (
    <div className="">
      {data?.map((item, index) => {
        return (
          <div>
            <h3 className="pt-4 text-lg">Booking {index + 1}</h3>
            <div
              key={item.id}
              className="text-base grid lg:grid-cols-4 sm:grid-cols-2 justify-between mx-auto border-b-2 pb-4 border-[#0d1130]"
            >
              <div>
                <p className="font-bold">Created</p>
                <p>{formatDate(item.created)}</p>
              </div>
              <div>
                <p className="font-bold">Date from</p>
                <p>{formatDate(item.dateFrom)}</p>
              </div>
              <div>
                <p className="font-bold">Date to</p>
                <p>{formatDate(item.dateTo)}</p>
              </div>
              <div>
                <p className="font-bold">Guests</p>
                <p>{item.guests}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

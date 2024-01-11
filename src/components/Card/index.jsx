import { Link } from "react-router-dom";

export default function Card({ image, title, id }) {
  return (
    <div className="card max-w-96 bg-base-100 shadow-xl">
      <figure className="max-h-48">
        <img className="object-cover h-full w-full" src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions mt-4">
          <Link
            to={`/venue/${id}`}
            className="bg-[#0D1130] text-white w-full text-center py-2 border rounded-2xl"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
}

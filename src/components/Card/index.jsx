import { Link } from "react-router-dom";
import Tag from "../Tag";
import PriceTag from "../PriceTag";

export default function Card({ image, title, id, meta, price }) {
  return (
    <div className="card max-w-96 bg-base-100 shadow-xl">
      <figure className="max-h-48">
        {image ? (
          <img className="object-cover h-full w-full" src={image} alt={title} />
        ) : (
          <img
            className="object-cover h-full w-full"
            src="/noimage.webp"
            alt={title}
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <PriceTag price={price} />
        <div className="card-actions mt-2">
          <div className="card-actions justify-end mb-2">
            {meta.breakfast && <Tag title="Breakfast" />}
            {meta.parking && <Tag title="Parking" />}
            {meta.pets && <Tag title="Pets allowed" />}
            {meta.wifi && <Tag title="Wifi" />}
          </div>
          <Link
            to={`/venue/${id}`}
            className="bg-[#0D1130] text-white w-full text-center py-2 border rounded-2xl"
          >
            View more
          </Link>
        </div>
      </div>
    </div>
  );
}

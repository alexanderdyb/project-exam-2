import { Link } from "react-router-dom";

export default function Card() {
  return (
    <div className="card max-w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions mt-4">
          <Link className="bg-[#0D1130] text-white w-full text-center py-2 ">
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PriceTag({ price }) {
  return (
    <p className="text-sm">
      <span className="badge badge-lg font-bold bg-white text-[#161616]">{`${price} NOK per night`}</span>
    </p>
  );
}

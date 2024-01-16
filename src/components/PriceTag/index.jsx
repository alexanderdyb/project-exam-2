export default function PriceTag({ price }) {
  return (
    <p className="text-sm">
      <span className="badge badge-lg font-bold">{`${price} NOK per night`}</span>
    </p>
  );
}

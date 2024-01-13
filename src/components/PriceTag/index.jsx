export default function PriceTag({ price }) {
  return (
    <p className="text-base">
      Per night
      <span className="badge badge-lg font-bold">{`${price} NOK`}</span>
    </p>
  );
}

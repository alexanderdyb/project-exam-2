export default function PriceTag({ price }) {
  return (
    <p className="text-base">
      Per night
      <span className="badge badge-lg ">{`NOK ${price}`}</span>
    </p>
  );
}

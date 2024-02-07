export default function Avatar({ image }) {
  return (
    <div className="avatar">
      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img src={image} alt="avatar" />
      </div>
    </div>
  );
}

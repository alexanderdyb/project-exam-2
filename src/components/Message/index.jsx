export default function Message({ text, type }) {
  return (
    <div role="alert" className={`alert alert-${type}`}>
      <span>{text}</span>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function LinkButton({ text, url }) {
  return (
    <Link
      to={url}
      className="bg-[#0D1130] text-white w-full text-center py-2 border rounded-2xl"
    >
      {text}
    </Link>
  );
}

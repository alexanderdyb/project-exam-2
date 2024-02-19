export default function Button({ text, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#000e] text-white w-full text-center py-2 border rounded-2xl cursor-pointer`}
    >
      {text}
    </button>
  );
}

export default function Button({ text, color }) {
  return (
    <btn
      className={`bg-[#000e] text-white w-full text-center py-2 border rounded-2xl cursor-pointer`}
    >
      {text}
    </btn>
  );
}

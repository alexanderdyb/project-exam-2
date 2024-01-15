export default function SearchBar() {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text font-bold">Search by title</span>
      </div>
      <input
        type="text"
        placeholder="E.g., 'Wooden cabin'"
        className="input input-bordered w-full max-w-xs"
      />
    </label>
  );
}

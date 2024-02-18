export default function DialogModal({
  title,
  description,
  onClick,
  successMessage,
  errorMessage,
}) {
  return (
    <dialog id="delete_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{description}</p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="modal-action">
          {!successMessage && (
            <button
              onClick={onClick}
              className="btn bg-[#ff0000] text-white hover:bg-[#ff0000] hover:text-white"
            >
              Delete
            </button>
          )}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

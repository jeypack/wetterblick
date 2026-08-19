const Feedback = ({message, btnLabel, onClose}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-sm md:w-xl border-2 border-amber-900/50 p-4 rounded-md">
      <h3 className="text-white font-bold text-center">{message}</h3>
      <button
        className="bg-amber-800 text-amber-100 px-4 py-2 rounded-xl cursor-pointer"
        onClick={onClose}
      >
        {btnLabel || "Close"}
      </button>
    </div>
  );
};

export default Feedback;

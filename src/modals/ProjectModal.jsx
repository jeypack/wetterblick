import {useModal} from "../hooks/useModal";

export default function ProjectModal({title, category, description}) {
  const {closeModal} = useModal();

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-screen z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-4 rounded shadow-lg z-10">
        <h2 className="text-gray-500 text-2xl font-bold mb-2">{title}</h2>
        <div className="text-gray-300 bg-orange-950 px-3 py-1 rounded-2xl inline">
          {category}
        </div>
        <p className="text-gray-400 mt-4">{description}</p>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

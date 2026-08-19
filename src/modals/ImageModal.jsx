import {useModal} from "../hooks/useModal";

export default function ImageModal({src, alt, description}) {
  const {closeModal} = useModal();

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-screen z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-4 rounded shadow-lg z-10">
        <img src={src} alt={alt} className="w-60 h-60" />
        {description && <p className="text-gray-400 mt-4">{description}</p>}
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

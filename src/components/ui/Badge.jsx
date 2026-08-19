export default function Badge({text, onClick}) {
  return (
    <span
      className="bg-gray-700 text-gray-300 text-xs font-semibold mr-3 mb-2 px-2.5 py-0.5 inline-block rounded-full cursor-pointer"
      onClick={onClick}
    >
      {text}
    </span>
  );
}

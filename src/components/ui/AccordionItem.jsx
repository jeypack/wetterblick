export default function AccordionItem({title, content, isOpen, onClick, ref}) {
  
  return (
    <div
      className={
        "border border-r border-gray-600 text-gray-300 max-w-2xl p-2 w-full" +
        (isOpen ? " rounded-br-lg bg-gray-800" : "")
      }
      ref={ref}
    >
      <button
        className="w-full text-left py-1 px-4 focus:outline-none cursor-pointer"
        onClick={onClick}
      >
        <span className="font-semibold">{title}</span>
        <span className="float-right">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <p className="px-4 pb-6 pt-2 text-gray-600">{content}</p>}
    </div>
  );
}
export default function Sidebar({children}) {
  return (
    <aside className="flex flex-col justify-start items-start gap-2 p-2 rounded-br-2xl w-full min-h-auto md:w-2xs md:min-h-fit">
      <p className="text-neutral-400 pl-1">Suche nach Städten</p>
      {children}
    </aside>
  );
}

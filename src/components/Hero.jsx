
export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center gap-4 mt-8 mb-8 bg-slate-800">
      {/* <div className="hero relative">
        <img src={heroImg} className="base relative mx-auto inset-x-0" width="170" height="179" alt="" />
        <img src={reactLogo} className={`framework absolute top-9 h-6 z-10 mx-auto inset-x-0 ${styles.framework}`} alt="React logo" />
        <img src={viteLogo} className={`vite absolute top-26.75 h-6.5 w-auto z-0 mx-auto inset-x-0 ${styles.vite}`} alt="Vite logo" />
      </div> */}
      <div className="text-center">
        <h1 className="text-2xl text-slate-500 font-bold p-2">Syntax Institut - Module 3</h1>
        {/* <p className="text-lg text-amber-200">React + Vite</p> */}
      </div>
    </section>
  );
}

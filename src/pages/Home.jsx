import { useEffect } from "react";
import PageTitle from "../components/PageTitle";

export default function Home() {
  return (
    <>
      <PageTitle title="JP Syntax - Home" />
      <div className="flex flex-col justify-start items-center gap-2 w-full text-olive-50">
        <h1 className="text-3xl font-bold text-olive-50">Home</h1>
        <p className="text-lg text-olive-400">Hello</p>
      </div>
    </>
  );
}

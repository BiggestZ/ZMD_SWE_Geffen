'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex w-full justify-center space-y-16 space-x-10 grid grid-flow-rows auto-rows-min">
      <div className="flex space-y-10" />
      <h1 className="flex text-8xl font-bold justify-self-center">Picture Books</h1>
      <div className="flex grid grid-cols-2">
        <div className="flex grid grid-flow-rows auto-rows-min space-y-5 p-5">
          <div className="text-2xl font-bold">
            Research
          </div>
          <div className="text-xl">
            Dr. Geffen's research is focused on building a database of picture books to test their efficacy when used in educational settings. 
            Books are categorized according to various central themes, which can then be aligned with concepts being covered in the classroom and used as supplemental materials.
            This website serves as an accessible method of hosting and disseminating this database as a resource for other educators to draw upon.
          </div>
          <div className="text-xl">
            To suggest edits, changes, or additions to the database, or for further discussion on this research, Dr. Geffen can be reached by email at 
            <b> sgeffen@oxy.edu</b>.
          </div>
        </div>
        <div className="flex grid grid-flow-rows auto-rows-min space-y-5 p-5">
          <div className="text-2xl font-bold">Professor Geffen</div>
          <div className="flex text-xl text-wrap">
            Dr. Susan Geffen is a Psychology Professor at Occidental College in Los Angeles, Californnia. She specializes in two broad areas: 
            1) the developmental progression of language acquisition & development, and the accompanying cognitive skills in infants, children, and adults. 
            She uses experimental and corpus-based studies to examine these mechanisms. 
            2) the the scholarship of teaching and learning with an emphasis on student and faculty perceptions of nontraditional class materials and projects.
          </div>
        </div>
      </div>
      <button className="p-5 rounded-lg text-2xl bg-sky-800 text-white w-fit justify-self-center" onClick={() => router.push('/search')}>Explore Books</button>
      <div className="flex space-y-12" />
    </div>
  );
}

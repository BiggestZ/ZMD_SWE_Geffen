import { Subtopic } from "@/types"

const Tag : React.FC<Subtopic>= ({ SubtopicName }) => {
    return(
        <div className="w-fit h-fit p-1 bg-slate-500 rounded-md text-white">{ SubtopicName }</div>
    )
}

export { Tag };
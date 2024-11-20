import { Subtopic,Topic } from "@/types"

const Tag : React.FC<Subtopic> = ({ SubtopicName }) => {
    return(
        <div className="w-fit h-fit p-1 bg-slate-500 rounded-md text-white">{ SubtopicName }</div>
    )
}

const TopicTag : React.FC<Topic> = ({TopicName}) => {
    return(
        <div />
        //<div className="w-fit h-fit p-1 bg-slate-400 rounded-md text-white">{ TopicName }</div>
    )
}

export { Tag,TopicTag };
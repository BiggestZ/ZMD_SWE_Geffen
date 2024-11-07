import React from "react";
import { Tag } from "./tag";

const TagsContainer : React.FC = () => {
    return(
        <div className="flex flex-wrap flex-row place-content-start p-1 gap-2">
            <Tag SubtopicName={"racial diversity"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"ethnic diversity"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"(dis)ability: diversity"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"emotions: emotional regulation"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"gender: identity"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"gender: transition"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"gender: transgender"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"self-concept"} SubtopicID={0} TopicID={0} />
        </div>
    );
};

export { TagsContainer };

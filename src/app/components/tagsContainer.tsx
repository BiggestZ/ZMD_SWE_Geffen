import React from "react";
import Tag from "./tag";

const TagsContainer : React.FC = () => {
    return(
        <div className="flex flex-wrap flex-row place-content-start p-1 gap-2">
            <Tag SubtopicName={"love"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"family"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"psychology"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"child development"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"food"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"education"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"looooong word"} SubtopicID={0} TopicID={0} />
            <Tag SubtopicName={"looooooooooooooooonger word"} SubtopicID={0} TopicID={0} />
        </div>
    );
};

export default TagsContainer;

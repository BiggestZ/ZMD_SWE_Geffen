import React from "react";
import { Tag } from "./tag";

const TagsContainer : React.FC = () => {
    return(
        <div className="flex flex-wrap flex-row place-content-start p-1 gap-2">
            <Tag SubtopicName={"racial diversity"} SubtopicID={0} TopicID={0} />
        </div>
    );
};

export { TagsContainer };

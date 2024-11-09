import React from "react";
import type {
  TypesafeStructuredTextGraphQlResponse,
  StructuredTextGraphQlResponseRecord,
} from "react-datocms";
import { StructuredText } from "react-datocms";
import SkillProjectBlock from "../skills-carousel/SkillProjectBlock";

interface PropsSchema {
  data: TypesafeStructuredTextGraphQlResponse;
}

interface IconImageRecord extends StructuredTextGraphQlResponseRecord {
  __typename: "IconImageRecord";
  image: {
    url: string;
  };
}

interface SkillBlockRecord extends StructuredTextGraphQlResponseRecord {
  __typename: "SkillBlockRecord";
  title: string;
  shortDescription: string;
  projectLink?: string;
}

type BlockSchema = IconImageRecord | SkillBlockRecord;

const StructuredTextRenderer: React.FC<PropsSchema> = ({ data }) => {
  return (
    <StructuredText
      data={data}
      renderBlock={({ record }) => {
        // Narrow down the type of `record`
        if (isIconImageRecord(record)) {
          return (
            <img
              src={record.image.url}
              alt="skill icon mini"
              className="w-10"
            />
          );
        } else if (isSkillBlockRecord(record)) {
          return (
            <div className=" inline-flex my-2 lg:my-0 mr-10 min-w-full lg:w-1/3 lg:min-w-0 prose-h4:my-2">
              <SkillProjectBlock
                title={record.title}
                description={record.shortDescription}
                link={record.projectLink || ""}
              />
            </div>
          );
        }
        return null;
      }}
    />
  );
};

// Type guard for IconImageRecord
const isIconImageRecord = (
  record: StructuredTextGraphQlResponseRecord,
): record is IconImageRecord => {
  return record.__typename === "IconImageRecord";
};

// Type guard for SkillBlockRecord
const isSkillBlockRecord = (
  record: StructuredTextGraphQlResponseRecord,
): record is SkillBlockRecord => {
  return record.__typename === "SkillBlockRecord";
};

export default StructuredTextRenderer;

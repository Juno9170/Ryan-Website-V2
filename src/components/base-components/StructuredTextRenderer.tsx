import React from "react";
import type {
  TypesafeStructuredTextGraphQlResponse,
  StructuredTextGraphQlResponseRecord,
} from "react-datocms";
import { StructuredText } from "react-datocms";

interface PropsSchema {
  data: {
    value: TypesafeStructuredTextGraphQlResponse;
  };
}

interface ImageRecord extends StructuredTextGraphQlResponseRecord {
  image: {
    url: string;
  };
}

const StructuredTextRenderer: React.FC<PropsSchema> = (props) => {
  return (
    <StructuredText
      data={props.data}
      renderBlock={({ record }) => {
        const imageRecord = record as ImageRecord;
        return (
          <img
            src={imageRecord.image.url}
            alt={`skill icon mini`}
            className="w-10"
          />
        );
      }}
    />
  );
};

export default StructuredTextRenderer;

import React from "react";
import type { TypesafeStructuredTextGraphQlResponse } from "react-datocms";
import StructuredTextRenderer from "../base-components/StructuredTextRenderer";
import { activeSkill } from "@/funcs/atoms";
import { useStore } from "@nanostores/react";

interface PropsSchema {
  skills: Array<TypesafeStructuredTextGraphQlResponse>;
  related: String[][];
}
const SkillDescription: React.FC<PropsSchema> = ({ skills, related }) => {
  const $activeSkill = useStore(activeSkill);

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at 0% 50%, #e1ede9 0%, transparent 25%)",
      }}
      className="px-4 md:px-6 lg:px-12 xl:px-20 h-[80vh] prose-hr:my-4 prose-p:my-2 prose-img:my-2 xxl:prose-xl xl:prose-lg lg:prose-base prose-sm"
    >
      <StructuredTextRenderer data={skills[$activeSkill]} />
      <div className="pt-0">
        {related[$activeSkill] ? (
          <>
            <h3 className="!mt-4">Related Skills:</h3>

            <strong className="pl-4 flex gap-4">
              {related[$activeSkill].map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </strong>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SkillDescription;

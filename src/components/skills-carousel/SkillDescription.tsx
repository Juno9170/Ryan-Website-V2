import React from "react";
import type { TypesafeStructuredTextGraphQlResponse } from "react-datocms";
import StructuredTextRenderer from "../base-components/StructuredTextRenderer";
import { activeSkill } from "@/funcs/atoms";
import { useStore } from "@nanostores/react";

interface PropsSchema {
  skills: Array<{ value: TypesafeStructuredTextGraphQlResponse }>;
}
const SkillDescription: React.FC<PropsSchema> = ({ skills }) => {
  const $activeSkill = useStore(activeSkill);
  return (
    <div className="h-screen prose-hr:my-4 prose-p:my-2 prose-img:my-2 xxl:prose-xl xl:prose-lg lg:prose-base prose-sm bg-transparent">
      <StructuredTextRenderer data={skills[$activeSkill]} />
    </div>
  );
};

export default SkillDescription;

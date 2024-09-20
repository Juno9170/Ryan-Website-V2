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
    <div className=" xxl:prose-2xl xl:prose-xl lg:prose-lg md:prose-base prose-sm">
      <StructuredTextRenderer data={skills[$activeSkill]} />
    </div>
  );
};

export default SkillDescription;

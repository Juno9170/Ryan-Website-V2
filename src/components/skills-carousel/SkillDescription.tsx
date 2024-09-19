import React from 'react'
import type { TypesafeStructuredTextGraphQlResponse } from 'react-datocms'
import StructuredTextRenderer from '../base-components/StructuredTextRenderer'
interface PropsSchema {
    skill: {
    value: TypesafeStructuredTextGraphQlResponse;
    }
}
const SkillDescription:React.FC<PropsSchema> = ({skill}) => {
  return (
    
    <div className=" xxl:prose-2xl xl:prose-xl lg:prose-lg md:prose-base prose-sm">
        <StructuredTextRenderer data={skill} />
    </div>

  )
}

export default SkillDescription


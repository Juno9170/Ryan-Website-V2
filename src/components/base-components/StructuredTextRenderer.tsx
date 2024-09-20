import React from 'react'
import type { TypesafeStructuredTextGraphQlResponse } from 'react-datocms';
import { StructuredText } from 'react-datocms';

interface PropsSchema {
    data: {
        value: TypesafeStructuredTextGraphQlResponse;
    };
}
  

const StructuredTextRenderer: React.FC<PropsSchema> = (props) => {
  return (
    <StructuredText data={props.data}/>
  )
}

export default StructuredTextRenderer
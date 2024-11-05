import React from 'react'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

interface SkillProjectBlockProps {
    title: string
    description: string
    link?: string
}

const SkillProjectBlock : React.FC<SkillProjectBlockProps> = ({title, description, link = ""}) => {
    return (
        <Card className='h-40'>
          <CardContent className="p-4">
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            {
              link?
            <a
              href={link}
              className="inline-flex items-center text-sm text-primary hover:underline mt-2"
            >
              View Project
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>  
            :null}
          </CardContent>
        </Card>
      )
}

export default SkillProjectBlock
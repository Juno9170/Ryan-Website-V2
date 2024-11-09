import React from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface SkillProjectBlockProps {
  title: string;
  description: string;
  link?: string;
}

const SkillProjectBlock: React.FC<SkillProjectBlockProps> = ({
  title,
  description,
  link = "",
}) => {
  return (
    <Card className="min-w-full h-fit pb-2 lg:pb-0 lg:h-40">
      <CardContent className="px-4 py-1 lg:py-4">
        <h4 className="font-semibold flex justify-between">
          {title}{" "}
          {link ? (
            <a
              href={link}
              className="items-center text-sm text-primary hover:underline mt-2 inline-flex lg:hidden !m-0 font-AndersonLight"
            >
              View Project
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          ) : null}
        </h4>
        <p className="text-sm text-muted-foreground !my-0 !lg:my-1">
          {description}
        </p>
        {link ? (
          <a
            href={link}
            className="items-center text-sm text-primary hover:underline mt-2 hidden lg:inline-flex"
          >
            View Project
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default SkillProjectBlock;

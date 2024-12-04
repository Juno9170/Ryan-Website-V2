import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import { activeSkill } from "@/funcs/atoms";
interface PaginationDotsProps {
  size: number;
}

const SkillPagination = ({ size }: PaginationDotsProps) => {
  const $activeSkill = useStore(activeSkill);
  const handleDotClick = (index: number) => {
    activeSkill.set(index);
  };
  return (
    <div
      className="flex flex-row lg:flex-col "
      role="navigation"
      aria-label="Pagination"
    >
      <div className="flex flex-row md:flex-col gap-3 lg:gap-5">
        {Array.from({ length: size }, (_, i) => (
          <Button
            key={i}
            variant="ghost"
            size="icon"
            className={`w-3  h-3 p-0 rounded-full ${
              i === $activeSkill
                ? "bg-[#507E71] hover:bg-primary"
                : "bg-muted-foreground/20 hover:bg-muted-foreground/50"
            }`}
            onClick={() => handleDotClick(i)}
            aria-current={i === $activeSkill ? "page" : undefined}
            aria-label={`Page ${i + 1}`}
          >
            <span className="sr-only">{`Page ${i + 1}`}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SkillPagination;

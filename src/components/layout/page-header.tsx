import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Standard interior-page header band with spotlight treatment. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="spotlight border-b border-border/60 pb-16 pt-36">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </Container>
    </div>
  );
}

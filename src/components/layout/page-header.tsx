import { Container } from "@/components/layout/container";
import { DarkBand } from "@/components/ui/section";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  standfirst?: string;
};

/**
 * packet.html's cover block, reused as the header for every interior page.
 * It renders directly below the navbar on the same ink ground so the two read
 * as one masthead band.
 */
export function PageHeader({ eyebrow, title, standfirst }: PageHeaderProps) {
  return (
    <DarkBand>
      <Container>
        <div className="pb-[clamp(2.75rem,7vh,4rem)] pt-[clamp(2rem,5vh,3rem)]">
          {eyebrow ? (
            <p className="m-0 mb-5 text-[0.9375rem] italic text-bone-dim">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-[19ch] text-[clamp(2.125rem,1.3rem+3.6vw,3.5rem)] leading-[1.1]">
            {title}
          </h1>
          {standfirst ? (
            <p className="m-0 mt-6 max-w-[46ch] text-[clamp(1.125rem,1.05rem+0.4vw,1.3125rem)] font-extralight text-bone-dim">
              {standfirst}
            </p>
          ) : null}
        </div>
      </Container>
    </DarkBand>
  );
}

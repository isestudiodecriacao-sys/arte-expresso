import { TextFadeIn } from "@/components/ui/text-fade-in";
import VerticalCutRevealChars from "@/components/ui/m-vertical-cut-reveal-2";

export function TextFadeInDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-8">
      <TextFadeIn
        by="word"
        duration={0.6}
        staggerDelay={0.08}
        className="max-w-xl text-center text-3xl font-semibold tracking-tight text-foreground"
      >
        Beautiful text that gracefully fades into view, word by word.
      </TextFadeIn>
    </div>
  );
}

export default function Default() {
  return (
    <div className="space-y-12">
      <VerticalCutRevealChars />
      <TextFadeInDemo />
    </div>
  );
}

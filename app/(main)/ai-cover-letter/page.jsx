import { Suspense } from "react";
import CoverLetterLoader from "./_components/cover-letter-loader";
import CoverLetterContent from "./_components/cover-letter-content";
import DelayedLoader from "@/components/delayed-loader";

export default function CoverLetterPage() {
  return (
    <DelayedLoader delay={5000} fallback={<CoverLetterLoader />}>
      <CoverLetterContent />
    </DelayedLoader>
  );
}

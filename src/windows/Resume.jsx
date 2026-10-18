import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";

const Resume = () => (
  <>
    <div id="window-header" className="window-drag-handle">
      <WindowControls target="resume" />
      <h2>Resume</h2>
      <a
        href="/images/resume.webp"
        download="gaurav-resume.webp"
        className="cursor-pointer ml-auto"
        title="Download resume"
      >
        <Download className="icon" aria-hidden />
      </a>
    </div>
    <div className="mac-window-body overflow-y-auto p-4">
      <img
        src="/images/resume.webp"
        alt="Gaurav Chaudhary resume"
        className="w-full max-w-2xl mx-auto h-auto rounded shadow"
      />
    </div>
  </>
);

export default WindowWrapper(Resume, "resume");

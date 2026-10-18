import WindowControls from "#components/WindowControls";
import { techStack } from "#content/skills";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";

const Terminal = () => (
  <>
    <div id="window-header" className="window-drag-handle">
      <WindowControls target="terminal" />
      <h2>Skills</h2>
    </div>
    <div className="techstack mac-window-body overflow-y-auto">
      <p>
        <span className="font-bold">@gaurav % </span>
        show tech stack
      </p>
      <div className="label">
        <p className="w-32">Category</p>
        <p>Technologies</p>
      </div>
      <ul className="content">
        {techStack.map(({ category, items }) => (
          <li key={category} className="flex items-center flex-wrap gap-2">
            <Check className="check" size={20} aria-hidden />
            <h3>{category}</h3>
            <ul className="flex flex-wrap gap-1">
              {items.map((item, i) => (
                <li key={item}>
                  {item}
                  {i < items.length - 1 ? "," : ""}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="footnote">
        <p>
          <Check size={20} aria-hidden /> {techStack.length} categories loaded
        </p>
        <p className="flex items-center gap-2 mac-muted">
          <Flag size={15} fill="black" aria-hidden />
          Render time: 4.43ms
        </p>
      </div>
    </div>
  </>
);

export default WindowWrapper(Terminal, "terminal");

import WindowControls from "#components/WindowControls";
import { liveProjects } from "#content/safariLinks";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";

const Safari = () => (
  <>
    <div id="window-header" className="window-drag-handle flex-wrap gap-2">
      <WindowControls target="safari" />
      <h2 className="mac-window-title-inline md:hidden">Live projects</h2>
      <PanelLeft className="ml-2 md:ml-10 icon hidden md:block" aria-hidden />
      <div className="hidden md:flex items-center gap-1 ml-2">
        <ChevronLeft className="icon" aria-hidden />
        <ChevronRight className="icon" aria-hidden />
      </div>
      <div className="hidden md:flex flex-1 flex-center gap-3 min-w-0">
        <ShieldHalf className="icon hidden md:block" aria-hidden />
        <div className="search flex-1 min-w-0">
          <Search className="icon shrink-0" aria-hidden />
          <input
            type="text"
            readOnly
            placeholder="Live projects"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm"
          />
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-3">
        <Share className="icon" aria-hidden />
        <Plus className="icon" aria-hidden />
        <Copy className="icon" aria-hidden />
      </div>
    </div>
    <div className="blog mac-window-body overflow-y-auto">
      <h2>Live projects</h2>
      <div className="space-y-8">
        {liveProjects.map(({ id, image, title, date, link }) => (
          <div key={id} className="blog-post">
            <div className="col-span-2 min-h-30">
              <img src={image} alt="" className="rounded-md object-cover w-full h-40" />
            </div>
            <div className="content">
              <p>{date}</p>
              <h3>{title}</h3>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Open project
                <MoveRight className="icon-hover inline w-4 h-4 ml-1" aria-hidden />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default WindowWrapper(Safari, "safari");

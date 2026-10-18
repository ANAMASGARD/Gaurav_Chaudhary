import WindowControls from "#components/WindowControls";
import { socials } from "#content/socials";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => (
  <>
    <div id="window-header" className="window-drag-handle">
      <WindowControls target="contact" />
      <h2>Contact Me</h2>
    </div>
    <div className="p-5 space-y-5 mac-window-body overflow-y-auto">
      <img
        src="/images/gaurav-gta6-v2.webp"
        alt="Gaurav"
        className="w-20 h-20 rounded-full object-cover"
      />
      <h3 className="text-xl font-semibold">Let&apos;s connect</h3>
      <p className="mac-muted">
        Got an idea, a bug to squash, or just want to talk tech? I&apos;m in.
      </p>
      <ul className="flex flex-wrap gap-3">
        {socials.map(({ id, bg, link, icon, text }) => (
          <li key={id} style={{ backgroundColor: bg }} className="rounded-lg p-3 min-w-11">
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <img src={icon} alt="" className="size-5" />
              <p className="font-semibold text-sm text-white">{text}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default WindowWrapper(Contact, "contact");

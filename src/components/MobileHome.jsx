import { statusGlyphs } from "#components/StatusGlyphs";

const mobileSocials = [
  {
    id: "youtube",
    label: "YouTube",
    glyph: "youtube",
    link: "https://www.youtube.com/@ANAMASGARD",
    tone: "youtube",
  },
  {
    id: "github",
    label: "GitHub",
    glyph: "github",
    link: "https://github.com/ANAMASGARD",
    tone: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    glyph: "linkedin",
    link: "https://www.linkedin.com/in/mrnobody-flex-680baa215/",
    tone: "linkedin",
  },
  {
    id: "x",
    label: "X",
    glyph: "x",
    link: "https://x.com/GauravC18959107/",
    tone: "x",
  },
];

const MobileHome = () => (
  <section className="mobile-home md:hidden pointer-events-auto" aria-label="Social links">
    <div className="mobile-home-grid">
      {mobileSocials.map(({ id, label, glyph, link, tone }) => {
        const Icon = statusGlyphs[glyph];
        return (
          <a
            key={id}
            className="mobile-home-tile"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={`mobile-home-icon mobile-home-icon--${tone}`} aria-hidden>
              <Icon />
            </span>
            <span className="mobile-home-label">{label}</span>
          </a>
        );
      })}
    </div>
  </section>
);

export default MobileHome;

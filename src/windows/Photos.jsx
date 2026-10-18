import WindowControls from "#components/WindowControls";
import { gallery } from "#content/gallery";
import WindowWrapper from "#hoc/WindowWrapper";

const Photos = () => (
  <>
    <div id="window-header" className="window-drag-handle">
      <WindowControls target="photos" />
      <h2>Gallery</h2>
    </div>
    <div className="mac-window-body overflow-y-auto p-4 md:p-5">
      <ul className="photos-grid">
        {gallery.map(({ id, img, title }) => (
          <li key={id}>
            <img src={img} alt={title} loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default WindowWrapper(Photos, "photos");

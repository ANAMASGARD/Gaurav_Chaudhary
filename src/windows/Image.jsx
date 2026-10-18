import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/windows";

const ImageWindow = () => {
  const data = useWindowStore((s) => s.windows.imgfile?.data);
  if (!data) return null;
  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header" className="window-drag-handle">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>
      <div className="p-5 mac-window-body overflow-y-auto">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-auto max-h-[70vh] object-contain rounded"
          />
        ) : null}
      </div>
    </>
  );
};

export default WindowWrapper(ImageWindow, "imgfile");

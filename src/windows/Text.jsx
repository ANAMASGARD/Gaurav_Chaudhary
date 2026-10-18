import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/windows";

const Text = () => {
  const data = useWindowStore((s) => s.windows.txtfile?.data);
  if (!data) return null;
  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header" className="window-drag-handle">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>
      <div className="p-5 space-y-6 mac-window-body overflow-y-auto">
        {image ? (
          <img src={image} alt="" className="w-full h-auto rounded max-h-48 object-cover" />
        ) : null}
        {subtitle ? <h3 className="text-lg font-semibold">{subtitle}</h3> : null}
        {Array.isArray(description) &&
          description.map((para) => (
            <p key={para.slice(0, 24)} className="mac-prose leading-relaxed">
              {para}
            </p>
          ))}
      </div>
    </>
  );
};

export default WindowWrapper(Text, "txtfile");

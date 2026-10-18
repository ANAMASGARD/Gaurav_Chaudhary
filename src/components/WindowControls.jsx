import useWindowStore from "#store/windows";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div id="window-controls" className="pointer-events-auto">
      <button
        type="button"
        className="minimize"
        aria-label="Minimize window"
        onClick={() => minimizeWindow(target)}
      />
      <button
        type="button"
        className="maximize"
        aria-label="Maximize window"
        onClick={() => maximizeWindow(target)}
      />
      <button
        type="button"
        className="close"
        aria-label="Close window"
        onClick={() => closeWindow(target)}
      />
    </div>
  );
};

export default WindowControls;

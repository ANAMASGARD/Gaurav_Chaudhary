import Dock from "#components/Dock";
import MobileHome from "#components/MobileHome";
import MenuBar from "#components/MenuBar";
import ContactWindow from "#windows/Contact";
import FinderWindow from "#windows/Finder";
import ImageWindow from "#windows/Image";
import NotesWindow from "#windows/Notes";
import PhotosWindow from "#windows/Photos";
import ResumeWindow from "#windows/Resume";
import SafariWindow from "#windows/Safari";
import TerminalWindow from "#windows/Terminal";
import TextWindow from "#windows/Text";

const Desktop = () => (
  <div className="mac-desktop-layer mac-dark">
    <MenuBar />
    <MobileHome />
    <div className="mac-window-layer pointer-events-none">
      <FinderWindow />
      <SafariWindow />
      <PhotosWindow />
      <ContactWindow />
      <TerminalWindow />
      <ResumeWindow />
      <NotesWindow />
      <TextWindow />
      <ImageWindow />
    </div>
    <Dock />
  </div>
);

export default Desktop;

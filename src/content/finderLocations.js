const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    {
      id: 5,
      name: "LearnCraft Live",
      icon: "/images/folders/folder-code.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "LearnCraft Live.txt",
          icon: "/images/txt.svg",
          kind: "file",
          fileType: "txt",
          description: [
            "LearnCraft Live is an interactive learning experience built for live sessions and engagement.",
            "It combines modern frontend patterns with a bold, memorable UI.",
            "Open the live site from the safari icon file in this folder.",
          ],
        },
        {
          id: 2,
          name: "learncraft.live",
          icon: "/images/safari.svg",
          kind: "file",
          fileType: "url",
          href: "https://www.learncraft.live/",
        },
        {
          id: 3,
          name: "learncraft.png",
          icon: "/images/image.svg",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/learncraft-live.webp",
        },
      ],
    },
    {
      id: 6,
      name: "CareerShot",
      icon: "/images/folders/folder-projects.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "CareerShot.txt",
          icon: "/images/txt.svg",
          kind: "file",
          fileType: "txt",
          description: [
            "CareerShot helps shape resumes and career narratives with a developer-first workflow.",
            "Explore the repository for architecture and implementation details.",
          ],
        },
        {
          id: 2,
          name: "github.com/CareerShot",
          icon: "/images/safari.svg",
          kind: "file",
          fileType: "url",
          href: "https://github.com/ANAMASGARD/CareerShot",
        },
        {
          id: 3,
          name: "careershot.png",
          icon: "/images/image.svg",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/CareerShot.webp",
        },
      ],
    },
    {
      id: 7,
      name: "Audio Analyzer",
      icon: "/images/folders/folder-music.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Voice Tell.txt",
          icon: "/images/txt.svg",
          kind: "file",
          fileType: "txt",
          description: [
            "Voice Tell is an audio analyzer project — upload or stream audio and inspect it in the browser.",
            "Built for clarity, speed, and a polished UX.",
          ],
        },
        {
          id: 2,
          name: "voice-tell.vercel.app",
          icon: "/images/safari.svg",
          kind: "file",
          fileType: "url",
          href: "https://voice-tell.vercel.app/",
        },
        {
          id: 3,
          name: "analyzer.png",
          icon: "/images/image.svg",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/audio-analyzer.webp",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "gaurav.png",
      icon: "/images/image.svg",
      kind: "file",
      fileType: "img",
      imageUrl: "/images/gaurav-gta6-v2.webp",
    },
    {
      id: 2,
      name: "about-me.txt",
      icon: "/images/txt.svg",
      kind: "file",
      fileType: "txt",
      subtitle: "Gaurav Chaudhary",
      image: "/images/gaurav-gta6-v2.webp",
      description: [
        "Hey — I'm Gaurav. I build interactive web experiences that feel like products, not templates.",
        "This portfolio mixes a GTA-inspired hero with a macOS desktop — drag windows, browse projects, leave notes.",
        "When I'm not shipping, I'm tuning motion, typography, and the small details that make interfaces memorable.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.webp",
      icon: "/images/image.svg",
      kind: "file",
      fileType: "img",
      imageUrl: "/images/resume.webp",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

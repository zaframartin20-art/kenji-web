export interface DJSet {
  number: string;
  title: string;
  genre: string;
  duration: string;
  image: string;

  youtubeUrl?: string;
  soundcloudUrl?: string;
  localUrl?: string;

  tracklist: string[];
}

export const sets: DJSet[] = [
  {
    number: "01",
    title: "Big Room Journey",
    genre: "BIG ROOM HOUSE",
    duration: "30 MIN",
    image: "/images/sets/big-room-journey.jpg",
    localUrl: "/audio/big-room-journey.mp3",

    tracklist: [
      "Track real 01",
      "Track real 02",
      "Track real 03",
      "Track real 04",
    ],
  },

  {
    number: "02",
    title: "Festival Energy",
    genre: "BIG ROOM HOUSE",
    duration: "30 MIN",
    image: "/images/sets/festival-energy.jpg",
    localUrl: "/audio/festival-energy.mp3",

    tracklist: [
      "Track real 01",
      "Track real 02",
      "Track real 03",
      "Track real 04",
    ],
  },

  {
    number: "03",
    title: "Progressive Journey",
    genre: "PROGRESSIVE HOUSE",
    duration: "30 MIN",
    image: "/images/sets/progressive-journey.jpg",
    localUrl: "/audio/progressive-journey.mp3",

    tracklist: [
      "Track real 01",
      "Track real 02",
      "Track real 03",
      "Track real 04",
    ],
  },

  {
    number: "04",
    title: "Final Destination",
    genre: "BIG ROOM / PROGRESSIVE",
    duration: "30 MIN",
    image: "/images/sets/final-destination.jpg",
    localUrl: "/audio/final-destination.mp3",

    tracklist: [
      "Track real 01",
      "Track real 02",
      "Track real 03",
      "Track real 04",
    ],
  },
];
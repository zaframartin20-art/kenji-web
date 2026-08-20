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
    number: "SET 01",
    title: "Big Room Journey",
    genre: "BIG ROOM HOUSE",
    duration: "30 MIN",
    image: "/images/sets/set-01.jpg",

    youtubeUrl: "",
    soundcloudUrl: "",
    localUrl: "",

    tracklist: [
      "Track 01",
      "Track 02",
      "Track 03",
      "Track 04",
    ],
  },

  {
    number: "SET 02",
    title: "Festival Energy",
    genre: "BIG ROOM HOUSE",
    duration: "30 MIN",
    image: "/images/sets/set-02.jpg",

    youtubeUrl: "",
    soundcloudUrl: "",
    localUrl: "",

    tracklist: [
      "Track 01",
      "Track 02",
      "Track 03",
      "Track 04",
    ],
  },

  {
    number: "SET 03",
    title: "Progressive Journey",
    genre: "PROGRESSIVE HOUSE",
    duration: "30 MIN",
    image: "/images/sets/set-03.jpg",

    youtubeUrl: "",
    soundcloudUrl: "",
    localUrl: "",

    tracklist: [
      "Track 01",
      "Track 02",
      "Track 03",
      "Track 04",
    ],
  },

  {
    number: "SET 04",
    title: "Final Destination",
    genre: "BIG ROOM / PROGRESSIVE",
    duration: "30 MIN",
    image: "/images/sets/set-04.jpg",

    youtubeUrl: "",
    soundcloudUrl: "",
    localUrl: "",

    tracklist: [
      "Track 01",
      "Track 02",
      "Track 03",
      "Track 04",
    ],
  },
];
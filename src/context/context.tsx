import { createContext, useState } from "react";

interface Song {
  id: number;
  resource_type: string;
  playable: boolean;
  artwork_url: string;
  caption?: any;
  commentable: boolean;
  comment_count: number;
  created_at: string;
  description?: any;
  downloadable: boolean;
  download_count: number;
  duration: number;
  full_duration: number;
  embeddable_by: string;
  genre: string;
  has_downloads_left: boolean;
  kind: string;
  label_name: string;
  last_modified: string;
  license: string;
  likes_count: number;
  permalink: string;
  permalink_url: string;
  playback_count: number;
  public: boolean;
  publisher_metadata: Publishermetadata;
  purchase_title?: any;
  purchase_url?: any;
  release_date: string;
  reposts_count: number;
  secret_token?: any;
  sharing: string;
  state: string;
  streamable: boolean;
  tag_list: string;
  title: string;
  track_format: string;
  uri: string;
  urn: string;
  user_id: number;
  visuals?: any;
  waveform_url: string;
  display_date: string;
  media: Media;
  station_urn: string;
  station_permalink: string;
  track_authorization: string;
  monetization_model: string;
  policy: string;
  user: User;
  _resource_id: number;
  _resource_type: string;
}

interface User {
  avatar_url: string;
  city: string;
  comments_count: number;
  country_code: string;
  created_at: string;
  creator_subscriptions: Creatorsubscription[];
  creator_subscription: Creatorsubscription;
  description: string;
  followers_count: number;
  followings_count: number;
  first_name: string;
  full_name: string;
  groups_count: number;
  id: number;
  kind: string;
  last_modified: string;
  last_name: string;
  likes_count: number;
  playlist_likes_count: number;
  permalink: string;
  permalink_url: string;
  playlist_count: number;
  reposts_count?: any;
  track_count: number;
  uri: string;
  urn: string;
  username: string;
  verified: boolean;
  visuals?: any;
  badges: Badges;
  station_urn: string;
  station_permalink: string;
}

interface Badges {
  pro: boolean;
  pro_unlimited: boolean;
  verified: boolean;
}

interface Creatorsubscription {
  product: Product;
}

interface Product {
  id: string;
}

interface Media {
  transcodings: Transcoding[];
}

interface Transcoding {
  url: string;
  preset: string;
  duration: number;
  snipped: boolean;
  format: Format;
  quality: string;
}

interface Format {
  protocol: string;
  mime_type: string;
}

interface Publishermetadata {
  id: number;
  urn: string;
  artist: string;
  album_title: string;
  contains_music: boolean;
  upc_or_ean: string;
  isrc: string;
  explicit: boolean;
  p_line: string;
  p_line_for_display: string;
  c_line: string;
  c_line_for_display: string;
  release_title: string;
}

interface SongContextValue {
  currentSong: Song | null;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
}

export const SongContext = createContext<SongContextValue | null>(null);

function SongProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
}

export default SongProvider;

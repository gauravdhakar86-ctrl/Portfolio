"use client";
import { useState } from "react";
import { Search, Home, Heart, Music, Play, SkipForward, ShieldCheck, Lock, Sparkles } from "lucide-react";

const TRENDING_REELS = [
  { id: "5qap5aO4i9A", title: "Lofi Beats - Chill Coding Music", artist: "Lofi Records" },
  { id: "jfKfPfyJRdk", title: "Lofi Hip Hop Radio - Beats to Study", artist: "Lofi Girl" },
  { id: "4xDzrJKXOOY", title: "Synthwave Radio - Retro Beats", artist: "Synthwave Boy" },
  { id: "28JbNnsh8u0", title: "Bollywood Lo-Fi Chill Mix", artist: "Indian Indie" },
  { id: "5yx6BWlEVcY", title: "Punjabi Club Anthems Mix", artist: "Desi Nation" }
];

export default function SpotifyProSecureApp() {
  const [uniqueId, setUniqueId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [reels, setReels] = useState(TRENDING_REELS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [isPlaying, setIsPlaying] = useState(true);

  const currentTrack = reels[currentIndex] || reels[0];

  const handleLogin = (e) => {
    e.preventDefault();
    if (uniqueId.trim() === "GAURAV2026" || uniqueId.trim().length >= 6) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid Unique ID. Access Denied.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const searchResultTrack = {
      id: "jfKfPfyJRdk",
      title: searchQuery,
      artist: "YouTube Search Result",
    };

    setReels([searchResultTrack, ...reels]);
    setCurrentIndex(0);
    setIsPlaying(true);
    setSearchQuery("");
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
    setIsPlaying(true);
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLiked((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white font-sans p-4">
        <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md flex flex-col gap-6 shadow-2xl">
          <div className="flex items-center gap-3 text-green-500">
            <ShieldCheck size={32} />
            <h1 className="text-2xl font-bold tracking-tight">Spotify Pro Security</h1>
          </div>
          <p className="text-sm text-zinc-400">Enter your authorized Unique ID number to access the application.</p>
          
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 text-zinc-500" size={18} />
            <input
              type="password"
              placeholder="Enter Unique ID (e.g. GAURAV2026)"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-green-500"
              required
            />
          </div>

          {loginError && <p className="text-xs text-red-500 font-semibold">{loginError}</p>}

          <button type="submit" className="bg-green-500 text-black font-bold py-3 rounded-xl hover:bg-green-400 transition shadow-lg">
            Authenticate & Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white font-sans select-none overflow-hidden">
      <div className="w-full md:w-64 bg-zinc-950 p-4 md:p-6 flex md:flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-900 shrink-0">
        <div className="flex md:flex-col items-center md:items-start justify-between w-full gap-6">
          <h1 className="text-xl md:text-2xl font-extrabold text-green-500 flex items-center gap-2">
            <Music size={24} /> Spotify Pro
          </h1>

          <nav className="flex md:flex-col gap-2 w-full">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-3 p-2.5 rounded-xl font-semibold text-sm transition ${
                activeTab === "home" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Home size={18} /> <span className="hidden md:inline">Home Hub</span>
            </button>
            <button
              onClick={() => setActiveTab("reels")}
              className={`flex items-center gap-3 p-2.5 rounded-xl font-semibold text-sm transition ${
                activeTab === "reels" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles size={18} className="text-green-400" /> <span className="hidden md:inline">Reels Feed</span>
            </button>
            <button
              onClick={() => setActiveTab("liked")}
              className={`flex items-center gap-3 p-2.5 rounded-xl font-semibold text-sm transition ${
                activeTab === "liked" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Heart size={18} className="text-green-500 fill-green-500" /> <span className="hidden md:inline">Liked ({liked.length})</span>
            </button>
          </nav>
        </div>

        <div className="hidden md:block text-xs text-zinc-600">
          Secure ID: Authenticated ✅
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-b from-zinc-900 to-black p-4 md:p-8 overflow-y-auto flex flex-col gap-6 pb-28 md:pb-8">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-3 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search any song via YouTube API..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-green-500 shadow-inner"
            />
          </div>
          <button type="submit" className="bg-green-500 text-black font-bold px-5 py-2.5 rounded-full text-sm hover:bg-green-400 transition shadow">
            Search
          </button>
        </form>

        {activeTab === "reels" ? (
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full gap-4">
            <div className="w-full aspect-[9/16] max-h-[500px] bg-zinc-950 rounded-2xl border border-zinc-800 relative overflow-hidden shadow-2xl flex flex-col justify-between p-6">
              <div className="absolute inset-0 z-0 opacity-40">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1&controls=0`}
                  title={currentTrack.title}
                  className="w-full h-full object-cover pointer-events-none scale-150"
                />
              </div>
              <div className="z-10 bg-black/60 p-3 rounded-lg backdrop-blur-md flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-green-400 font-bold">Reels Auto-Play</span>
                <span className="text-xs text-zinc-300">{currentIndex + 1} / {reels.length}</span>
              </div>
              <div className="z-10 flex flex-col gap-3 bg-gradient-to-t from-black via-black/80 to-transparent p-4 -mx-6 -mb-6">
                <h3 className="text-xl font-extrabold line-clamp-2">{currentTrack.title}</h3>
                <p className="text-sm text-zinc-400">{currentTrack.artist}</p>
                <button
                  onClick={nextTrack}
                  className="w-full bg-green-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-400 transition shadow-lg"
                >
                  <SkipForward size={18} /> Next Trending Song
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-emerald-900/40 to-zinc-900 p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg bg-black shrink-0">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=${isPlaying ? 1 : 0}`}
                    title={currentTrack.title}
                    className="border-0 w-full h-full pointer-events-none"
                  />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-green-400 font-bold">Now Playing</span>
                  <h2 className="text-xl md:text-2xl font-bold mt-1 line-clamp-1">{currentTrack.title}</h2>
                  <p className="text-zinc-300 text-sm">{currentTrack.artist}</p>
                </div>
              </div>
              <button
                onClick={nextTrack}
                className="bg-white text-black font-bold px-4 py-2 rounded-full text-xs flex items-center gap-2 hover:bg-green-400 transition"
              >
                <SkipForward size={16} /> Auto Next
              </button>
            </div>

            <h3 className="text-xl font-bold mt-2">
              {activeTab === "liked" ? "Your Liked Music" : "Trending Recommendations"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
              {(activeTab === "liked" ? reels.filter(t => liked.includes(t.id)) : reels).map((track, idx) => {
                const isSelected = currentTrack.id === track.id;
                const isLiked = liked.includes(track.id);

                return (
                  <div
                    key={track.id + idx}
                    onClick={() => {
                      setCurrentIndex(reels.findIndex(r => r.id === track.id));
                      setIsPlaying(true);
                    }}
                    className={`p-4 rounded-xl transition cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected ? "bg-zinc-800 border border-green-500/50" : "bg-zinc-900/60 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center shrink-0">
                        <Play size={16} className={isSelected ? "text-green-400 fill-green-400" : "text-zinc-400"} />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className={`font-bold text-sm truncate ${isSelected ? "text-green-400" : "text-white"}`}>
                          {track.title}
                        </h4>
                        <p className="text-xs text-zinc-400">{track.artist}</p>
                      </div>
                    </div>
                    <button onClick={(e) => toggleLike(track.id, e)} className="shrink-0">
                      <Heart size={18} className={isLiked ? "text-green-500 fill-green-500" : "text-zinc-500 hover:text-white"} />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
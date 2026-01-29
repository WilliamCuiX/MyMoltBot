'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  cover: string;
  url: string;
}

export default function MusicPlayer() {
  const [songs] = useState<Song[]>([
    {
      id: 1,
      title: 'Summer Breeze',
      artist: 'Dream Wave',
      duration: 215,
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      url: '',
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      artist: 'Night Owl',
      duration: 187,
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
      url: '',
    },
    {
      id: 3,
      title: 'Ocean Waves',
      artist: 'Coastal',
      duration: 234,
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      url: '',
    },
  ]);

  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && progress < currentSong.duration) {
        setProgress((prev) => prev + 1);
      } else if (progress >= currentSong.duration) {
        nextSong();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, progress, currentSong.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  const prevSong = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 播放器卡片 */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* 专辑封面 */}
          <div className="relative aspect-square rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <Image
              src={currentSong.cover}
              alt={currentSong.title}
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-500"
              priority
            />
            {/* 播放中动画效果 */}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/50 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* 歌曲信息 */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentSong.title}
            </h2>
            <p className="text-purple-200 text-lg">
              {currentSong.artist}
            </p>
          </div>

          {/* 进度条 */}
          <div className="mb-8">
            <input
              type="range"
              min="0"
              max={currentSong.duration}
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-2 text-purple-200 text-sm">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <button
              onClick={prevSong}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
            >
              {isPlaying ? (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={nextSong}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* 音量控制 */}
          <div className="flex items-center gap-4 px-4">
            <svg
              className="w-5 h-5 text-purple-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <span className="text-purple-200 text-sm w-12 text-right">
              {volume}%
            </span>
          </div>
        </div>

        {/* 播放列表 */}
        <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <h3 className="text-white font-semibold mb-4 px-2">播放列表</h3>
          <div className="space-y-2">
            {songs.map((song) => (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentSong(song);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                  currentSong.id === song.id
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={song.cover}
                    alt={song.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p
                    className={`font-medium truncate ${
                      currentSong.id === song.id ? 'text-white' : 'text-white/80'
                    }`}
                  >
                    {song.title}
                  </p>
                  <p
                    className={`text-sm truncate ${
                      currentSong.id === song.id
                        ? 'text-purple-200'
                        : 'text-white/50'
                    }`}
                  >
                    {song.artist}
                  </p>
                </div>
                <div className="text-purple-200 text-sm flex-shrink-0">
                  {formatTime(song.duration)}
                </div>
                {currentSong.id === song.id && isPlaying && (
                  <div className="flex items-end gap-0.5 h-4 w-4">
                    <div className="w-1 bg-purple-400 rounded-full animate-pulse" style={{ height: '60%' }}></div>
                    <div className="w-1 bg-pink-400 rounded-full animate-pulse" style={{ height: '80%', animationDelay: '0.1s' }}></div>
                    <div className="w-1 bg-purple-400 rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

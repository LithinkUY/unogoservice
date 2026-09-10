/**
 * Media utilities for handling video URLs (YouTube, Vimeo, MP4 direct)
 */

export interface VideoInfo {
  isEmbed: boolean;
  type: 'youtube' | 'vimeo' | 'direct';
  embedUrl?: string;
  directUrl?: string;
  videoId?: string;
  thumbnailUrl?: string;
}

export function parseVideoUrl(url: string, options?: {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}): VideoInfo {
  if (!url || typeof url !== 'string') {
    return { isEmbed: false, type: 'direct', directUrl: '' };
  }

  const cleanUrl = url.trim();
  const autoplay = options?.autoplay ?? true;
  const muted = options?.muted ?? true;
  const loop = options?.loop ?? true;
  const controls = options?.controls ?? true;

  // 1. YouTube detection
  // Matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const ytMatch = cleanUrl.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i
  );

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    const params = new URLSearchParams();
    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('mute', '1');
    if (loop) {
      params.set('loop', '1');
      params.set('playlist', videoId);
    }
    if (!controls) params.set('controls', '0');
    params.set('rel', '0');
    params.set('modestbranding', '1');
    params.set('playsinline', '1');

    return {
      isEmbed: true,
      type: 'youtube',
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
  }

  // 2. Vimeo detection
  // Matches: vimeo.com/123456789 or player.vimeo.com/video/123456789
  const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    const params = new URLSearchParams();
    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('muted', '1');
    if (loop) params.set('loop', '1');
    if (!controls) params.set('controls', '0');

    return {
      isEmbed: true,
      type: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?${params.toString()}`
    };
  }

  // 3. Direct video file or generic URL
  return {
    isEmbed: false,
    type: 'direct',
    directUrl: cleanUrl
  };
}

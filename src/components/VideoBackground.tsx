import { h } from 'preact';
import { useEffect, useRef } from 'preact/compat';

const VideoBackground = ({ onLoad, src }: { onLoad: () => void; src: string }) => {
    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        video.current?.addEventListener('loadedmetadata', () => onLoad());
    }, []);

    return (
        <div className="video-container">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video ref={video} autoPlay loop muted controls={false}>
                <source src={src} type="video/mp4">
                    Your browser does not support the video tag.
                </source>
            </video>
        </div>
    );
};

export default VideoBackground;

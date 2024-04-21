import { Fragment, h } from 'preact';
import { useState } from 'preact/compat';
import Card from './Card';
import VideoBackground from './VideoBackground';
import SocialLink from './SocialLink';
import FacebookIcon from './FacebookIcon';
import LinkedInIcon from './LinkedInIcon';
import GithubIcon from './GithubIcon';

const App = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onVideoLoad = () => {
        setIsVideoLoaded(true);
        setTimeout(() => setIsLoading(false), 600);
    };

    return (
        <Fragment>
            <VideoBackground onLoad={onVideoLoad} src="assets/video/approved/pexels_6.mp4" />

            <div className={`fadeout${!isVideoLoaded ? ' fadeout--show' : ''}`} />

            <Card isLoading={isLoading} title="michi.dk" subTitle="michelle fich - webudvikler">
                <div className="social-links">
                    <SocialLink
                        title="Go to Facebook"
                        url="https://www.facebook.com/michelle.fich"
                        icon={<FacebookIcon />}
                    />
                    <SocialLink
                        title="Go to LinkedIn"
                        url="https://www.linkedin.com/in/michellefich"
                        icon={<LinkedInIcon />}
                    />
                    <SocialLink
                        title="Go to Github"
                        url="https://www.facebook.com/michelle.fich"
                        icon={<GithubIcon />}
                    />
                </div>
            </Card>
        </Fragment>
    );
};

export default App;

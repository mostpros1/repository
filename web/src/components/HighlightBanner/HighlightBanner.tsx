import "./HighlightBanner.css"
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import AppleStore from "../../assets/Appstore_button.png"
import GooglePlay from "../../assets/Google-play-badge-1.png"

function HighlightBanner() {
    return (
        <div className="highlight_banner">
            <div className="highlight_banner_wrapper">
                <div className="highlight_review">
                    <div className="highlight_stars">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarHalfIcon />
                    </div>
                    <p>100+ huizen en tuinen in onderhoud</p>
                </div>
                <div className="highlight_start">
                    <p>Sinds 2023</p>
                </div>
                <div className="highlight_appstore">
                    <div className="appstore_button">
                        <img src={AppleStore} alt="" />
                    </div>
                    <div className="googleplay_button">
                        <img src={GooglePlay} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HighlightBanner
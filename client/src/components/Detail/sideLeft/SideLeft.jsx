import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon
} from 'react-share'
import newsCard from "@src/assets/images/news_card.jpg"
import { useLocation } from "react-router-dom"
import "./SideLeft.css"

const FRONT_URL = import.meta.env.VITE_FRONT_URL;

const SideLeft = () => {
  const location = useLocation()
  const shareUrl = `${FRONT_URL + location.pathname}`



  return (
    <div className='side-left'>
      <div className="social-media has-background-white p-5">
        <h1 className='is-size-6 has-text-weight-bold mb-4'>اشتراک گذاری</h1>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon round={true} size={40} />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>

        <TelegramShareButton url={shareUrl}>
          <TelegramIcon round={true} size={40} />
        </TelegramShareButton>
      </div>

      <div className='details-ads has-text-centered mt-5'>
        <img src={newsCard} width={250} alt="" />
      </div>
    </div>
  )
}

export default SideLeft
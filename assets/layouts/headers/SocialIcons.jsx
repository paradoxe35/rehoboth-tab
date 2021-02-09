import React from "react"
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi"


const SocialIcons = ({ className = undefined }) => {
    return <div className={className}>
        <a href="#" className="twitter">
            <FiFacebook />
        </a>
        <a href="#" className="facebook">
            <FiTwitter />
        </a>
        <a href="#" className="instagram">
            <FiInstagram />
        </a>
    </div>
}

export default SocialIcons
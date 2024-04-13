import React from 'react'
import { FaShare} from "react-icons/fa";

import {
FacebookShareButton,
TwitterShareButton,
WhatsappShareButton,
EmailShareButton,
FacebookIcon,
TwitterIcon,
WhatsappIcon,
EmailIcon,
FacebookMessengerShareButton,
FacebookMessengerIcon
} from "react-share";


const ShareButtons = ({property}) => {

  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
  return (
   <>
      <h3 className='text-xl font-bold pt-2 text-center'> Share Property : </h3>

      <div className='flex gap-3  pb-5 justify-center'>
      <FacebookShareButton 
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type}ForRent`}
      >
        <FacebookIcon size={40} className='rounded-full' />
      </FacebookShareButton>



      <WhatsappShareButton
         url={shareUrl}
          title={property.name}
          separator='::'
      >
         <WhatsappIcon size={40}  className='rounded-full' />
      </WhatsappShareButton>

      <EmailShareButton
         url={shareUrl}
          title={property.name}
          body={`check put this property listing : ${shareUrl}`}
      >
         <EmailIcon size={40}   className='rounded-full'/>
      </EmailShareButton>

      </div>
   </>
  )
}

export default ShareButtons
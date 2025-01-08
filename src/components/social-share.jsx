import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  RiFacebookCircleLine,
  RiTwitterXLine,
  RiLinkedinBoxLine,
  RiWhatsappLine,
  RiMailSendLine,
} from "react-icons/ri";

const SocialShare = ({ url, title, description, hashtag }) => {
  return (
    <div className="flex items-center gap-6">
      {/* Facebook */}
      <FacebookShareButton url={url} quote={title} hashtag={hashtag}>
        <RiFacebookCircleLine
          size={24}
          className="text-typography-tertiary hover:text-primary-600 duration-300 transition-colors"
        />
      </FacebookShareButton>

      {/* Twitter */}
      <TwitterShareButton url={url} title={title} hashtags={[hashtag]}>
        <RiTwitterXLine
          size={24}
          className="text-typography-tertiary hover:text-primary-600 duration-300 transition-colors"
        />
      </TwitterShareButton>

      {/* LinkedIn */}
      <LinkedinShareButton url={url} title={title} summary={description}>
        <RiLinkedinBoxLine
          size={24}
          className="text-typography-tertiary hover:text-primary-600 duration-300 transition-colors"
        />
      </LinkedinShareButton>

      {/* Email */}
      <EmailShareButton url={url} subject={title} body={description}>
        <RiMailSendLine
          size={24}
          className="text-typography-tertiary hover:text-primary-600 duration-300 transition-colors"
        />
      </EmailShareButton>

      {/* WhatsApp */}
      <WhatsappShareButton url={url} title={title} separator=" - ">
        <RiWhatsappLine
          size={24}
          className="text-typography-tertiary hover:text-primary-600 duration-300 transition-colors"
        />
      </WhatsappShareButton>
    </div>
  );
};

export default SocialShare;

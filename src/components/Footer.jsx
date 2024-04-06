import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  TelegramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";

function Footer() {
  return (
    <footer className="bg-transparent font-bold mt-10 py-4 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-sm">
            &copy; 2024 Our Website. All rights reserved - Shaked & Sean.
          </p>
        </div>
        <div className="flex justify-center items-center mt-4">
          <ul className="flex space-x-4">
            <li>
              <a href="/about-us" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/policy" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-400">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-5 flex justify-center ">
        <FacebookShareButton
          url={"https://www.google.com/"}
          quote={"testtt"}
          hashtag={"#vidoe Created By VidWizard"}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <WhatsappShareButton url={"/"}>
          <WhatsappIcon size={40} className="ml-10" round={true} />
        </WhatsappShareButton>
        <TelegramShareButton url={"/"}>
          <TelegramIcon
            size={40}
            className="ml-10"
            round={true}

            // iconFillColor="#000"
          />
        </TelegramShareButton>
        <EmailShareButton url={"/"}>
          <EmailIcon size={40} className="ml-10" round={true} />
        </EmailShareButton>
        <TwitterShareButton url={"/"}>
          <TwitterIcon size={40} className="ml-10" round={true} />
        </TwitterShareButton>
      </div>
    </footer>
  );
}

export default Footer;

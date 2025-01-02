import { Link } from "react-router";

const footerLinks = [
  {
    id: 1,
    title: "Twitter",
    url: "https://twitter.com",
  },
  {
    id: 2,
    title: "LinkedIn",
    url: "https://linkedin.com",
  },
  {
    id: 3,
    title: "Email",
    url: "mailto:contact@theblog.com",
  },
  {
    id: 4,
    title: "RSS Feed",
    url: "https://linkedin.com",
  },
  {
    id: 5,
    title: "Add to Feedly",
    url: "https://feedly.com",
  },
];

const Footer = () => {
  return (
    <>
      <footer className="text-sm">
        <div className="w-full xl:container px-4 mx-auto">
          <nav className="py-8">
            <ul className="flex flex-wrap items-center justify-start gap-2 lg:gap-6">
              <li>
                <span>
                  &copy; 2024 <span className="font-semibold">The Blog</span>
                </span>
              </li>
              {footerLinks.map((item) => (
                <li
                  key={item.id}
                  className="transition-colors duration-300 hover:text-primary-500 focus:text-primary-600"
                >
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;

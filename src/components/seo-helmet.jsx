import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({
  title = "Default Title",
  description = "Default description",
  url = window.location.href, // Default to the current URL
  img = "/default-image.jpg", // Default image
  name = "Website Name", // Site name
  type = "website", // Default Open Graph type
}) => {
  return (
    <Helmet>
      {/* Standard Metadata */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph Tags */}
      {type && <meta property="og:type" content={type} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {img && <meta property="og:image" content={img} />}
      {url && <meta property="og:url" content={url} />}
      {name && <meta property="og:site_name" content={name} />}

      {/* Twitter Tags */}
      {name && <meta name="twitter:creator" content={name} />}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {img && <meta name="twitter:image" content={img} />}
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default SEO;

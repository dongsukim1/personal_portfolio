import React from "react";
import { track } from "@vercel/analytics";
// Styles
import styled from "styled-components";
// State
import { useGetUsersQuery, useGetSocialsQuery } from "../app/apiSlice";
// Icons
import { Icon } from "@iconify/react";
// Config
import { Blog, linkedinUrl, emailAddress } from "../config";
// Utils
import { isValidString, isValidArray } from "../utils";

// #region styled-components
const StyledSocialLinks = styled.div`
  a {
    margin: 0 1rem;
  }
`;
// #endregion

// Social media icon mapping
const getSocialIcon = (provider) => {
  const iconMap = {
    linkedin: "fa-brands:linkedin",
    twitter: "fa6-brands:square-x-twitter", 
    facebook: "fa-brands:facebook-square",
    instagram: "fa-brands:instagram-square",
    tiktok: "fa-brands:tiktok",
    email: "mdi:email",
  };
  
  return <Icon icon={iconMap[provider] || "ph:link-bold"} />;
};

const extraSocials = [
  {
    provider: "linkedin",
    url: linkedinUrl,
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    provider: "email",
    url: `mailto:${emailAddress}`,
    ariaLabel: `Send an email to ${emailAddress}`,
  },
];

// #region component
const SocialLinks = () => {
  const { data: userData } = useGetUsersQuery();
  const { isSuccess, error, data: socialsData } = useGetSocialsQuery();

  React.useEffect(() => {
    if (error) {
      console.log(
        `${error.status} - check getSocials query in src/app/apiSlice.js`
      );
    }
  }, [error, socialsData]);

  return (
    <StyledSocialLinks>
      {/* GitHub link - always show if userData exists */}
      {isValidString(userData?.html_url) && (
        <a
          href={userData.html_url}
          aria-label="Check out my GitHub profile."
          className="link-icons"
        >
          <Icon icon="icomoon-free:github" />
        </a>
      )}
      
      {/* Social media links */}
      {isSuccess &&
        [
          ...(isValidArray(socialsData) ? socialsData : []),
          ...extraSocials.filter(
            (extra) =>
              extra.url &&
              !(isValidArray(socialsData) &&
                socialsData.some((social) => social.provider === extra.provider))
          ),
        ].map((social, index) => (
          <a
            key={`${social.provider}-${index}`}
            href={social.url}
            aria-label={social.ariaLabel || `Visit ${social.provider} profile`}
            className="link-icons"
          >
            {getSocialIcon(social.provider)}
          </a>
        ))}
      
      {/* Blog link */}
      {isValidString(userData?.blog) && (
        <a
          href={userData.blog}
          aria-label="Visit blog"
          className="link-icons"
          onClick={() =>
            track("GitHub Link Clicked", {
              source: "SocialLinks",
              url: userData.html_url,
            })
          }
        >
          {Blog || <Icon icon="ph:link-bold" />}
        </a>
      )}
    </StyledSocialLinks>
  );
};
// #endregion

export default SocialLinks;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faTags, faCircle, faHome, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const Menubar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropDownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const menuItems = [
    {
      title: "System Overview",
      icon: faUser,
      links: [
        { name: "System Overview", path: "/support/systemoverview" },
        { name: "Last Basket Received", path: "/support/basketreceived" },
        { name: "Last Redemptions Received", path: "/support/lastredemption" },
        { name: "Missing Qtoken", path: "/support/missingqtoken" },
      ],
    },
    {
      title: "Shoppers",
      icon: faUsers,
      links: [
        { name: "Find Shopper", path: "/support/findshopper" },
        { name: "Reward Stuck", path: "/support/rewardstuck" },
        { name: "My Rewards", path: "/support/myrewards" },
      ],
    },
    {
      title: "Coupons",
      icon: faTags,
      links: [
        { name: "Find Coupon", path: "/coupon/viewcoupon" },
        { name: "Recurring Coupons", path: "/coupon/recurringcoupons" },
      ],
    },
    {
      title: "System Monitoring",
      icon: faUsers,
      links: [
        { name: "Q Token Queue Status", path: "#" },
        { name: "Push Notification Queue", path: "#" },
        { name: "Last Basket Received", path: "#" },
        { name: "Reward Opt-In Status", path: "/support/rewardoptins" },
      ],
    },
    {
      title: "Redemptions",
      icon: faCircle,
      links: [
        { name: "View Redemptions", path: "/users/getredemption" },
      ],
    },
    {
      title: "RSA Client",
      icon: faHome,
      links: [
        { name: "View Retailers", path: "/global/viewretailers" },
      ],
    },
  ];

  return (
    <div id="sidebar-menu">
      <ul className="sidebar-menu-ul">
        {menuItems.map((item, index) => (
          <li key={index} className={`has_sub sub-${item.title.toLowerCase().replace(/\s/g, '-')}`}>
            <a href="javascript:void(0);" className="d-block" onClick={() => handleDropDownToggle(index)}>
              <FontAwesomeIcon icon={item.icon} className="faAngledown" />
              <span className="menuText">{item.title}</span>
              <span className="pull-right">
                <FontAwesomeIcon icon={openDropdown === index ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />
              </span>
            </a>
            {openDropdown === index && (
              <ul className={`sidebar-menu-ul-child-${item.title.toLowerCase().replace(/\s/g, '-')} nav`}>
                {item.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.path}>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menubar;

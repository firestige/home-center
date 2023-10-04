import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import PropTypes from "prop-types";

// @ts-ignore
const NavigationScroll = ({ children }) => {
  const location = useLocation()
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return children || null;
}

NavigationScroll.prototype = {
  children: PropTypes.node
}

export default NavigationScroll
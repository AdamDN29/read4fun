import React from "react";
import clsx from "clsx";
import Button from "react-bootstrap/Button";
import { scrollToTop } from "../helper/scroll";
import { FaArrowUp } from "react-icons/fa";
import PropTypes from "prop-types";
import '../css/gotopbutton.css'

const GoTopButton = ({ visible = true }) => (
  <Button
    className={clsx("back-to-top-btn", { "back-to-top-btn--visible": visible })}
    onClick={scrollToTop}
    variant="dark"
  >
    <FaArrowUp className="icon_arrow"/>
  </Button>
);

GoTopButton.propTypes = {
  visible: PropTypes.bool
};

export default GoTopButton;

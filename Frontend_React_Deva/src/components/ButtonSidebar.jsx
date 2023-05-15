/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Button } from "primereact/button";

const ButtonSidebar = ({
    title,
    textCont,
    typeBtn,
    icon,
    mb = 6,
    px = 20,
    borderBtn,
    ...props
}) => {
    return (
        <Button
            {...typeBtn}
            severity={borderBtn}
            style={{
                borderRadius: 10,
                flexDirection: "row",
                gap: 15,
                width: "100%",
                alignItems: "center",
                padding: `12px ${px}px`,
                marginBottom: mb,
            }}
            {...props}
        >
            <i className={icon} style={{ color: textCont }}></i>
            <div style={{ color: textCont, fontSize: 14 }}>{title}</div>
        </Button>
    );
};

ButtonSidebar.propTypes = {
    title: PropTypes.string.isRequired,
    textCont: PropTypes.string.isRequired,
    typeBtn: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    mb: PropTypes.number,
    px: PropTypes.number,
    borderBtn: PropTypes.string.isRequired,
};

export default ButtonSidebar;

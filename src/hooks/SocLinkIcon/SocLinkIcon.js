import React from "react";
import useSocLinkSVGImport from "./useSocLinkSVGImport";
import {Image, Spinner, chakra, Icon} from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
// import { IconProps } from "./types/interfaces";

/**
 * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
 * or even use the hook directly in your components.
 */
const SocLinkIcon = ({
    name, iconSet, size, onCompleted, onError, ...rest
}) => {
    const { error, loading, svgPath } = useSocLinkSVGImport(name, iconSet, {
        onCompleted,
        onError,
    });
    if (error) {
        return <p>{error.message}</p>;
    }
    else if (svgPath) {
        return <ReactSVG src={svgPath} {...rest}
                         beforeInjection={(svg) => {
                             svg.setAttribute('style', `width: ${size}px; height: ${size}px; color:black;`)
                         }}/>;
    }
    else if (loading) {
        return <Spinner/>;
    }
    return null;
};

export default SocLinkIcon;

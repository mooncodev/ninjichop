import React from "react";
import useDynamicSVGImport from "./useDynamicSVGImport";
import {Image, Spinner} from "@chakra-ui/react";
// import { IconProps } from "./types/interfaces";

/**
 * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
 * or even use the hook directly in your components.
 */
const CryptoIcon = ({
    name, size, onCompleted, onError, ...rest
}) => {
    const { error, loading, svgPath } = useDynamicSVGImport(name, {
        onCompleted,
        onError,
    });
    if (error) {
        return <p>{error.message}</p>;
    }
    if (loading) {
        return <Spinner/>;
    }
    if (svgPath) {
        return <Image src={svgPath} {...rest} style={{ height: size, width: size }} />;
    }
    return null;
};

export default CryptoIcon;

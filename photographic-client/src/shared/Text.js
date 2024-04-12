import React from "react";
import ShowMoreText from "react-show-more-text";
import './shared.css'
const Foo = ({text}) => {

    

    return (
        <ShowMoreText
            /* Default options */
            lines={2}
            more="See more"
            less="See less"
            className="content-css"
            anchorClass="show-more-less-clickable"
            expanded={false}
            truncatedEndingComponent={"... "}
        >
            {text}
        </ShowMoreText>
    );
};

export default Foo;

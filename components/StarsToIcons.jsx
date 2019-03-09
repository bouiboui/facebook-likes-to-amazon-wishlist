import React, {Fragment} from 'react'
import {Icon} from "react-bulma-components";
import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";

const StarsToIcon = ({stars}) => {
    if (!(stars && stars.length)) return null;
    const rating = stars.replace('a-icon a-icon-star a-star-', '');
    if (rating.length < 1) return null;

    const halfStar = rating.indexOf('-5') > 0;

    const fullStars = halfStar
        ? parseInt(rating.slice(0, 1))
        : parseInt(rating);

    const starIcons = new Array(fullStars)
        .fill(<Icon size={"small"}><FaStar/></Icon>)
        .concat(halfStar ? <Icon size={"small"}><FaStarHalfAlt/></Icon> : []);

    return <Fragment>{
        starIcons
            .concat(new Array(5 - starIcons.length)
            .fill(<Icon size={"small"}><FaRegStar/></Icon>))
    }</Fragment>
};

export default StarsToIcon;
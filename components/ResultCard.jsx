import React from 'react'
import {Card, Heading, Icon, Media} from "react-bulma-components";
import {FaExternalLinkAlt} from "react-icons/fa";

import StarsToIcons from "./StarsToIcons";

const ResultCard = ({data}) => {

    const {image, link, price, stars, title} = data;

    const absoluteLink = link.slice(0, 1) === '/' ? (process.env.AMAZON_BASE_URL + link) : link;

    return <Card>
        <a href={absoluteLink}><Card.Image size="square" src={image}/></a>
        <Card.Content>
            <Media>
                <Media.Item>
                    <Heading subtitle className='has-text-centered has-text-warning	'>
                        <StarsToIcons stars={stars}/>
                    </Heading>
                    <div>{title}</div>
                </Media.Item>
            </Media>
        </Card.Content>
        <Card.Footer>
            <Card.Footer.Item>
                <div>{price}</div>
            </Card.Footer.Item>
            <Card.Footer.Item>
                <a href={absoluteLink} target="_blank">
                    <Icon><FaExternalLinkAlt/></Icon> Amazon</a>
            </Card.Footer.Item>
        </Card.Footer>
    </Card>
};

export default ResultCard;
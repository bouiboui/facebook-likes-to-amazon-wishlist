import React, {Fragment, useState} from 'react';
import {Helmet} from "react-helmet";
import {FaPlayCircle} from "react-icons/fa";
import {Button, Container, Heading, Hero, Icon, Section} from 'react-bulma-components';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import LikeBox from "./components/LikeBox";

const loadFacebookLikes = async (setLoadingLikes, setLikes) => {
    setLoadingLikes(true);
    const resp = await fetch('/api/facebook-likes');
    const likes = await resp.json();
    setLoadingLikes(false);
    setLikes(likes);
};

const Index = () => {

    const [likes, setLikes] = useState(null);
    const [isLoadingLikes, setLoadingLikes] = useState(false);

    return <Fragment>

        <Helmet>
            <meta charSet="UTF-8"/>
            <title>Page Title</title>
        </Helmet>

        <Hero color="dark">
            <Hero.Body>
                <Container>
                    <Heading>Facebook likes to Amazon wishlist</Heading>
                    <Heading subtitle>Find <strong>Amazon</strong> products related to
                        your <strong>Facebook</strong> likes!</Heading>
                    {(likes === null) && (
                        <Button
                            size={"medium"}
                            loading={isLoadingLikes}
                            onClick={() => loadFacebookLikes(setLoadingLikes, setLikes)}
                            color="link">
                            <Icon><FaPlayCircle/></Icon>
                            <span>Start loading Facebook likes!</span>
                        </Button>
                    )}
                </Container>
            </Hero.Body>
        </Hero>

        {likes !== null && (
            <Section>
                <br/>
                <Container>
                    {likes.map((like, index) => <LikeBox like={like} key={index}/>)}
                </Container>
            </Section>
        )}

    </Fragment>
};

export default Index;
import {Box, Button, Columns, Heading, Notification} from "react-bulma-components";
import React, {Fragment, useState} from "react"
import ResultCard from "./ResultCard";
import {Icon} from "react-bulma-components/dist";
import {FaPlayCircle, FaTimes} from "react-icons/fa";

const loadAmazonResults = async (setLoadingResults, setLikeResults, query) => {
    setLoadingResults(true);
    const resp = await fetch('/api/amazon-search/q/' + query);
    const {results} = await resp.json();
    setLoadingResults(false);
    setLikeResults(results);
};

const LikeBox = ({like}) => {

    const [likeResults, setLikeResults] = useState(null);
    const [isLoadingResults, setLoadingResults] = useState(false);

    return <Box key={like}>

        <Heading size={4}>{like}</Heading>

        {(null === likeResults) && (
            <Button
                loading={isLoadingResults}
                onClick={() => loadAmazonResults(setLoadingResults, setLikeResults, like)}
                color="warning">
                <Icon><FaPlayCircle/></Icon>
                <span>Load Amazon results</span>
            </Button>
        )}

        {(null !== likeResults) && (
            <Fragment>
                {likeResults.length && (


                    <Columns>

                        {likeResults.map((result, index) => (

                            <Columns.Column size={"one-fifth"} key={index}>
                                <ResultCard data={result}/>
                            </Columns.Column>

                        ))}

                    </Columns>

                ) || (

                    <Notification color="light">
                        <Icon><FaTimes/></Icon>
                        <span>No Amazon search results for {like}.</span>
                    </Notification>

                )}
            </Fragment>

        )}

    </Box>
};

export default LikeBox;
import React from 'react';
import {useParams} from "react-router-dom"

export default function Article() {
    const {topicId, articleId} = useParams()
    return (
        <div>
            <div>{topicId}</div>
            <div>{articleId}</div>
        </div>
    );
}

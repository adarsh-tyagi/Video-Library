import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import "./VideoCard.css"

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${String(video._id)}`} className="videoCard__container">
      <div className="player">
        <ReactPlayer url={video.video.url} controls={false} width="100%" height="100%" />
      </div>

      <div className="videoCard__info">
        <img src={video.owner.avatar.url} alt={video.owner.name} />
        <div className="videoCard__text">
          <p>{video.title}</p>
          <p>{video.owner.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;

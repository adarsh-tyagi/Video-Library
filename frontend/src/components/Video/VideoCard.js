import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${String(video._id)}`} className="videoCard__container">
      <ReactPlayer
        url={video.video.url}
        controls={false}
        height="150px"
        width="200px"
      />
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

import React from "react";
import { useSelector } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  requestArtistInfo,
  receiveArtistInfo,
  receiveArtistInfoError,
} from "../../reducers/artists-reducer";
import styled from "styled-components";

export const ArtistRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const artist = useSelector((state) => state.artists.currentArtist);
  let followers;
  let followerString;
  let genres;
  let image;
  console.log(artist);

  if (artist) {
    image = artist.profile.images[1].url;
    console.log(image);
    followers = artist.profile.followers.total;
    genres = artist.profile.genres.splice(0, 2);
    let decimalPoints = Number(followers.toString().length);
    let suffix;
    if (decimalPoints >= 7) {
      //M
      suffix = "M";
      let x = decimalPoints - 6;
      let a = followers.toString().slice(0, x);
      let b = followers.toString().slice(x, 2);
      followerString = `${a}.${b}${suffix}`;
    } else if (decimalPoints >= 4) {
      //K
      suffix = "K";
      let x = decimalPoints - 3;
      let a = followers.toString().slice(0, x);
      let b = followers.toString().slice(x, 2);
      followerString = `${a}.${b}${suffix}`;
    } else {
      followerString = `${followers}`;
    }
  }

  const { id } = useParams();
  const artistId = id;

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    try {
      dispatch(requestArtistInfo());
      let data = fetchArtistProfile(accessToken, artistId);
      data.then((result) => dispatch(receiveArtistInfo({ result })));
    } catch (err) {
      console.log(err);
      dispatch(receiveArtistInfoError());
    }
  }, [accessToken]);

  return (
    <>
      {artist && (
        <>
          <Container>
            <AppDiv>
              <ProfileImage src={image} />
              <ArtistName>{artist.profile.name}</ArtistName>
              <Followers>
                <span style={{ color: "#FF4FD8" }}>{followerString} </span>
                followers
              </Followers>
              <InfoFont>tags</InfoFont>
              <TagDiv>
                {genres.map((genre) => {
                  return <GenreTab>{genre}</GenreTab>;
                })}
              </TagDiv>
            </AppDiv>
          </Container>
        </>
      )}
    </>
  );
};

const TagDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GenreTab = styled.div`
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: center;
  align-items: center;
  background: rgba(75, 75, 75, 0.4);
  color: white;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
`;

const InfoFont = styled.h3`
  position: absolute;
  left: 170px;
  top: 338px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  /* identical to box height */

  text-transform: lowercase;

  /* White */

  color: #ffffff;

  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  position: absolute;
  width: 175px;
  height: 175px;
  left: 104px;
  top: 59px;
  border-radius: 190.5px;
`;

const Followers = styled.h3`
  color: white;
  position: absolute;
  left: 141px;
  top: 257px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArtistName = styled.h1`
  color: white;
  position: absolute;
  left: 90px;
  top: 173px;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;

const AppDiv = styled.div`
  background: #0b0f14;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
  width: 375px;
  height: 812px;
`;

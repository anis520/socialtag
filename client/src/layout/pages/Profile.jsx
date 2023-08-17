import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
// import profile from "../../assets/image/login.png";
import { MdDehaze, MdDelete, MdEdit, MdMessage, MdShare } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { timeAgoFromMongoDB } from "../../utils/timeAgoFunction";
import userAvater from "../../assets/useravater.png";
import userCover from "../../assets/cover.jpg";
import {
  getAllUsers,
  getLikePost,
  getPost,
  getUpdatePhoto,
} from "../../features/Auth/authapiSlice";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  const [updateimage, setupdateimage] = useState({
    show: false,
    type: "",
    photo: null,
  });
  const dispatch = useDispatch();

  const { user, loading, posts, message, error, users } = useSelector(
    (state) => state.auth
  );
  const findSingleProfile = users.find((e) => e._id == params.id);
  const findSingleProfilePost = posts.filter(
    (e) => e.posterId._id == params.id
  );

  const handelikepost = (postId) => {
    dispatch(getLikePost({ postId, likeId: user._id }));
  };

  useEffect(() => {
    dispatch(getPost());
    dispatch(getAllUsers());
    window.scrollTo(0, 0);
  }, [dispatch, user]);
  const handleclosUpdatePhotomodel = () => {
    setupdateimage({
      show: false,
      type: "",
      photo: null,
    });
  };
  const handleUpdateImage = () => {
    let from_data = new FormData();
    from_data.append("userphoto", updateimage.photo);
    from_data.append("type", updateimage.type);
    from_data.append("id", user._id);

    dispatch(getUpdatePhoto(from_data));

    setupdateimage({
      show: false,
      type: "",
      photo: null,
    });
  };

  return (
    <div className="bg-slate-100 w-screen min-h-screen py-20 ">
      <Navbar />

      {/* post div  */}
      {updateimage.show && (
        <div className="fixed bg-opacity-60  h-screen w-screen top-0 left-0 bg-slate-300 z-30 flex items-center justify-center ">
          <div className="p-7 bg-white rounded-md relative md:w-5/12  md:h-4/6">
            <MdDelete
              onClick={handleclosUpdatePhotomodel}
              className="absolute top-1 right-1 bg-red-500 text-white h-8 w-8 rounded-md cursor-pointer"
            />
            <label htmlFor="photo">
              <img
                src={
                  updateimage.photo
                    ? URL.createObjectURL(updateimage.photo)
                    : updateimage.type == "photo"
                    ? userAvater
                    : userCover
                }
                className="w-80 h-52 md:w-full md:h-5/6 md:mb-4 cursor-pointer p-2 border-2 border-primaryBg rounded-md object-cover "
                alt=""
              />
              <input
                type="file"
                onChange={(e) =>
                  setupdateimage({ ...updateimage, photo: e.target.files[0] })
                }
                name=""
                id="photo"
                className="hidden"
              />{" "}
            </label>

            <p
              onClick={handleUpdateImage}
              className="bg-primaryBg text-white w-full font-semibold p-1 text-center cursor-pointer rounded-md"
            >
              update
            </p>
          </div>
        </div>
      )}

      <div className=" mx-2     md:mx-10  p-2 md:p-5 bg-white mt-2 rounded-3xl shadow-md">
        <div className="relative">
          {findSingleProfile._id == user._id && (
            <MdEdit
              className="absolute right-[-5px] top-[-5px] bg-white h-8 border  w-8 hover:scale-110 cursor-pointer rounded-md"
              onClick={() => setupdateimage({ show: true, type: "cover" })}
            />
          )}

          <img
            src={
              findSingleProfile.cover
                ? `http://localhost:9000/userphoto/${findSingleProfile.cover}`
                : userCover
            }
            alt=""
            className="w-full mx-auto rounded-2xl border  h-36  md:h-64 object-cover  "
          />
          <div className="flex absolute  bottom-[-60px] md:bottom-[-100px] left-0 md:left-16 gap-3 md:gap-5  items-center">
            {findSingleProfile._id == user._id && (
              <MdEdit
                className="relative  left-32  md:left-56 bottom-6 bg-white w-6 h-6 md:h-8 border  md:w-8 hover:scale-110 cursor-pointer rounded-md"
                onClick={() => setupdateimage({ show: true, type: "photo" })}
              />
            )}

            <img
              src={
                findSingleProfile.photo
                  ? `http://localhost:9000/userphoto/${findSingleProfile.photo}`
                  : userAvater
              }
              alt=""
              className="mx-auto  border-4 shadow-md border-white mt-5   h-28 w-28   md:w-48 md:h-48 rounded-full object-cover  "
            />
            <div className="md:mt-20 mt-14">
              <p className="text-sm font-semibold md:text-2xl">
                {findSingleProfile?.username}
              </p>
              <p className="text-xs md:text-lg font-semibold text-gray-600">
                {findSingleProfile?.email}
              </p>
            </div>
            {/* {findSingleProfile._id == user._id ? (
              <p></p>
            ) : (
              <>
                {user.follow.includes(findSingleProfile._id) ? (
                  <p className="text-xs text-primaryBg border-2 border-primaryBg  font-semibold px-2 rounded-md py-1 ms-6 md:ms-80 mt-16   md:mt-16 md:text-lg  cursor-pointer ">
                    unfollow
                  </p>
                ) : (
                  <p className="text-xs bg-primaryBg text-white font-semibold px-2 rounded-md py-1 ms-6 md:ms-80 mt-16   md:mt-16 md:text-lg  cursor-pointer ">
                    Follow
                  </p>
                )}
              </>
            )} */}
          </div>
        </div>{" "}
        <div className=" p-10 md:p-16"></div>
      </div>

      <div className=" rounded-md p-5 mt-1 md:mt-4   w-full  md:w-10/12 mx-auto grid grid-cols-6 gap-2 ">
        {" "}
        <div className="col-span-2 bg-white rounded-md shadow-sm p-5 sticky  top-24  h-fit  space-y-2 hidden md:block">
          <p className="font-semibold  mb-2">Follower</p>
          {findSingleProfile?.follow?.map((item, key) => {
            return (
              <>
                {" "}
                {/* follower */}
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 border rounded-md hover:bg-slate-100 cursor-pointer duration-200"
                >
                  <img
                    src={
                      item.photo
                        ? `http://localhost:9000/userphoto/${item.photo}`
                        : userAvater
                    }
                    className="w-14 h-14 shadow-md  rounded-full"
                    alt=""
                  />
                  <p className="font-semibold  text-secondaryText">
                    {item.username}
                  </p>
                  <Link to={`/profile/${item._id}`}>
                    <p className="font-semibold  bg-primaryBg text-white px-2 rounded-md cursor-pointer md:hidden lg:block   lg:ms-20">
                      view
                    </p>
                  </Link>
                </div>
                {/* follower */}
              </>
            );
          })}
        </div>
        <div className=" col-span-full  md:col-span-4  px-2 ">
          {[...findSingleProfilePost].reverse()?.map((item, key) => {
            return (
              <>
                {" "}
                {/* single post  */}
                <div
                  key={key}
                  className="bg-white  w-full mb-3 border rounded-md shadow-sm "
                >
                  {/* post header  */}
                  <div className="flex p-4 gap-4 items-center">
                    <img
                      src={
                        item.posterId.photo
                          ? `http://localhost:9000/userphoto/${item.posterId.photo}`
                          : userAvater
                      }
                      className=" w-12 h-12  md:w-16 md:h-16 border object-cover rounded-full   "
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-secondaryText text-sm md:text-lg ">
                        {item.posterId.username}
                      </p>
                      <p className=" text-xs md:text-sm text-gray-500 font-semibold">
                        {timeAgoFromMongoDB(item.createdAt)}
                      </p>
                    </div>

                    <MdDehaze className="ms-auto mb-auto" />
                  </div>
                  {/* post header  */}

                  {/* post title  */}
                  <div className="px-5 pb-3 ">
                    <p className="font-sans text-gray-600 font-semibold text-sm md:text-lg">
                      {item.text}
                    </p>
                  </div>

                  {/* post title  */}
                  {/* post body  */}

                  <img
                    src={`http://localhost:9000/post/${item.photo}`}
                    className="  border w-11/12 rounded-md  object-cover  mx-auto"
                    alt=""
                  />

                  {/* post body  */}
                  {/* post fotter  */}
                  <div className="py-4 flex gap-2 items-center px-5 ">
                    {item?.like?.includes(user._id) ? (
                      <AiFillLike
                        onClick={() => handelikepost(item._id)}
                        className=" p-2 rounded-full cursor-pointer hover:scale-105 duration-150  bg-teal-100 text-primaryText   h-8 w-8   md:h-10 md:w-10 "
                      />
                    ) : (
                      <AiFillLike
                        onClick={() => handelikepost(item._id)}
                        className=" p-2 rounded-full bg-gray-200 cursor-pointer hover:scale-105 duration-150  text-gray-600   h-8 w-8   md:h-10 md:w-10 "
                      />
                    )}

                    <MdMessage className=" p-2 rounded-full bg-gray-200  h-8 w-8   md:h-10 md:w-10 " />
                    <p className="font-semibold text-secondaryText text-xs md:text-sm">
                      <span className="text-primaryText  ">
                        {item.like.length}
                      </span>{" "}
                      Like
                    </p>
                    <p className="font-semibold text-secondaryText text-xs  md:text-sm">
                      <span className="text-primaryText  ">
                        {item.comment.length}
                      </span>{" "}
                      Commnet
                    </p>
                    <MdShare className=" ms-auto p-2 rounded-full bg-gray-200 h-8 w-8 md:h-10 md:w-10" />
                  </div>
                  {/* post fotter  */}
                </div>
                {/* single post  */}
              </>
            );
          })}

          {findSingleProfilePost.length == 0 && (
            <p className="bg-slate-200 p-4 rounded-md text-center font-semibold text-gray-600 md:text-lg ">
              no post by {findSingleProfile.username}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

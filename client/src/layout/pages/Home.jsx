import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import profile from "../../assets/image/login.png";
import uploadimage from "../../assets/image/uploadimage.png";
import processing from "../../assets/processing.gif";
import userAvater from "../../assets/useravater.png";
import {
  MdDehaze,
  MdDelete,
  MdMessage,
  MdShare,
  MdSunny,
} from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getFollowUser,
  getLikePost,
  getPost,
  userLogout,
  userPost,
} from "../../features/Auth/authapiSlice";
import { toast } from "react-toastify";
import "./home.css";
import { timeAgoFromMongoDB } from "../../utils/timeAgoFunction";
import { setMessageEmpty } from "../../features/Auth/authSlice";
const Home = () => {
  const { user, loading, posts, message, error, users } = useSelector(
    (state) => state.auth
  );

  const [theme, settheme] = useState(false);
  const [post, setpost] = useState(false);
  const [postinput, setpostinput] = useState("");

  const [photo, setphoto] = useState();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };

  const handleclosepostmodel = () => {
    setpost(!post);
    setphoto(null);
    setpostinput("");
  };

  const handlepost = () => {
    let from_data = new FormData();
    from_data.append("post", photo);
    from_data.append("posterId", user._id);
    from_data.append("text", postinput);

    dispatch(userPost(from_data));
    handleclosepostmodel();
  };

  const handleFollowUser = (followId) => {
    dispatch(getFollowUser({ userId: user._id, followId }));
  };
  const handelikepost = (postId) => {
    dispatch(getLikePost({ postId, likeId: user._id }));
  };

  useEffect(() => {
    dispatch(getPost());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    // if (auth.user) {
    // }
    if (error) {
      toast.error(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toast.success(message);

      dispatch(setMessageEmpty());
    }
    window.scrollTo(0, 0);
  }, [error, message]);
  return (
    <div className="bg-slate-100 w-screen min-h-screen py-20 ">
      <Navbar />

      {/* post div  */}
      {post && (
        <div className="fixed bg-opacity-60  h-screen w-screen top-0 left-0 bg-slate-300 z-30 flex items-center justify-center ">
          <div className="p-7 bg-white rounded-md relative ">
            <MdDelete
              onClick={handleclosepostmodel}
              className="absolute top-1 right-1 bg-red-500 text-white h-8 w-8 rounded-md cursor-pointer"
            />
            <label htmlFor="photo">
              <img
                src={photo ? URL.createObjectURL(photo) : uploadimage}
                className="w-80 h-52 cursor-pointer p-2 border-2 border-primaryBg rounded-md object-cover "
                alt=""
              />
              <input
                type="file"
                onChange={(e) => setphoto(e.target.files[0])}
                name=""
                id="photo"
                className="hidden"
              />{" "}
            </label>
            <textarea
              value={postinput}
              onChange={(e) => setpostinput(e.target.value)}
              id="w3review"
              name="w3review"
              rows="2"
              className="w-full border my-2 rounded-md bg-teal-100 "
            />
            <p
              onClick={handlepost}
              className="bg-primaryBg text-white w-full font-semibold p-1 text-center rounded-md"
            >
              post
            </p>
          </div>
        </div>
      )}

      {/* post div  */}
      <div className="grid grid-cols-8 mx-5 md:gap-3    md:mx-10">
        <div className=" p-10 col-span-2 mt-2  hidden lg:block"></div>
        <div className="border p-10 col-span-2 bg-white  fixed rounded-md top-24 hidden lg:block left-5 w-[310px]  ">
          <img
            src={
              user?.photo
                ? `http://localhost:9000/userphoto/${user?.photo}`
                : userAvater
            }
            className="w-24 border rounded-full mx-auto slide-in-bottom"
            alt=""
          />
          <div className="slide-in-bottom1">
            <p className="text-secondaryText font-semibold text-2xl text-center mt-3 ">
              {user?.username}
            </p>
            <p className="text-sm font-semibold text-center text-gray-500 ">
              {user?.email}
            </p>
            <Link to={`/profile/${user._id}`}>
              <p className="bg-primaryBg text-white w-6/12 mx-auto rounded-md p-1 text-center font-semibold mt-5 cursor-pointer">
                view profile
              </p>
            </Link>
            <Link to={"/login"}>
              <p
                onClick={handleLogout}
                className="bg-red-400  text-white w-6/12 mx-auto rounded-md p-1 text-center font-semibold mt-1 cursor-pointer"
              >
                Logout
              </p>
            </Link>{" "}
            <div onClick={() => settheme(!theme)}>
              {theme ? (
                <p className="bg-gray-500  text-white w-6/12 mx-auto rounded-md p-1 text-center font-semibold mt-1 cursor-pointer flex items-center justify-center gap-2">
                  Dark <MdSunny />
                </p>
              ) : (
                <p className="bg-gray-100  text-secondaryText  w-6/12 mx-auto rounded-md p-1 text-center font-semibold mt-1 cursor-pointer flex items-center justify-center gap-2">
                  Light <MdSunny />
                </p>
              )}
            </div>{" "}
          </div>
        </div>
        {/* post div  */}
        <div className="   col-span-8   md:col-span-5 lg:col-span-4 ">
          {loading ? (
            <div className="bg-white p-2 text-center w-full mt-4 text-primaryBg font-semibold text-lg md:text-xl cursor-pointer border rounded-md shadow-sm flex items-center justify-center gap-3 ">
              processing
              <img
                src={processing}
                className="rounded-full p-2 h-10 w-10 "
                alt=""
              />
            </div>
          ) : (
            <div
              className="bg-white p-4 text-center w-full mt-4 text-primaryBg font-semibold text-lg md:text-xl cursor-pointer border rounded-md shadow-sm "
              onClick={() => setpost(!post)}
            >
              create a post
            </div>
          )}

          {[...posts].reverse()?.map((item, key) => {
            return (
              <>
                {" "}
                {/* single post  */}
                <div
                  key={key}
                  className="bg-white  w-full mt-3 border rounded-md shadow-sm "
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
                      <Link to={`/profile/${item.posterId._id}`}>
                        <p className="font-semibold text-secondaryText text-sm md:text-lg ">
                          {item.posterId.username}
                        </p>
                      </Link>
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
        </div>
        {/* post div  */}
        <div className=" p-10 col-span-2 mt-2  hidden md:block"></div>
        <div className="border p-5 col-span-2 bg-white  fixed rounded-md top-24 hidden md:block right-5 w-[310px]  space-y-4 max-h-[500px] overflow-x-scroll">
          <p className="font-semibold text-primaryText mb-5">
            People in SocialTag
          </p>
          {users?.map((item, key) => {
            return (
              <>
                {item._id == user._id ? (
                  <></>
                ) : (
                  <>
                    <div key={key} className="flex items-center gap-4 ">
                      <Link to={`/profile/${item._id}`}>
                        <img
                          src={
                            item.photo
                              ? `http://localhost:9000/userphoto/${item.photo}`
                              : userAvater
                          }
                          alt=""
                          className="w-10 h-10 object-cover rounded-full border cursor-pointer"
                        />
                      </Link>
                      <Link to={`/profile/${item._id}`}>
                        <p className="font-semibold text-secondaryText  w-28 cursor-pointer   ">
                          {item.username}
                        </p>
                      </Link>

                      {user.follow.includes(item._id) ? (
                        <p
                          className="font-semibold cursor-pointer text-primaryBg  bg-white px-3 rounded-md border-2 ms-auto border-primaryBg  "
                          onClick={() => handleFollowUser(item._id)}
                        >
                          unollow
                        </p>
                      ) : (
                        <p
                          className="font-semibold cursor-pointer text-white  bg-primaryBg px-3 rounded-md border-2 ms-auto border-primaryBg  "
                          onClick={() => handleFollowUser(item._id)}
                        >
                          Follow
                        </p>
                      )}
                    </div>
                  </>
                )}{" "}
              </>
            );
          })}
        </div>{" "}
      </div>
    </div>
  );
};

export default Home;

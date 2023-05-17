import React, { useEffect, useState } from "react";
import { getUser } from "../../../axios/services/chat/clientChat";
import Avatar from '../../../assets/images/profileLogo.png'

function UsersList({ conversation, currentUser }) {

  const [userList , setUserList ] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    const findUser = async () => {
      const friend = await getUser(friendId);
      setUserList(friend);
    };
    findUser();
  }, [conversation,currentUser]);
  return (
    <div className="flex flex-row px-10 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-50">
      <div className="w-1/4">
        <img
          src={userList?.profile ? userList?.profile : Avatar}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{userList?.fname}</div>
        <span className="text-gray-500">Pick me at 9:00 Am</span>
      </div>
    </div>
  );
}

export default UsersList;

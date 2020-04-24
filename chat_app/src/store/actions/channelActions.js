export const createChannel = (title, description) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const creatorId = getState().firebase.auth.uid;
    const creatorUserName = getState().firebase.profile.userName;

    const firestore = getFirestore();

    console.log(title, description, creatorUserName);

    return firestore
      .collection("channels")
      .add({
        channelName: title,
        description: description,
        creatorUserName: creatorUserName,
        createdAt: new Date(),
        creatorId: creatorId,
        members: [],
        messages: [],
      })
      .then((resp) => {
        return firestore
          .collection("channels")
          .doc(resp.id)
          .update({ channelId: resp.id });
      });
  };
};

export const channelStar = (channelName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    let starredArray = "";
    getState().firestore.ordered.users.map((user) => {
      return user.id === getState().firebase.auth.uid
        ? (starredArray = user.starredRooms)
        : null;
    });

    let starredArrayUpdated = starredArray.concat(channelName);

    firestore
      .collection("users")
      .doc(authorId)
      // .collection("likedPosts")
      .update({ starredRooms: starredArrayUpdated });
  };
};

export const channelUnstar = (channelName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    let starredArray = "";
    getState().firestore.ordered.users.map((user) => {
      return user.id === getState().firebase.auth.uid
        ? (starredArray = user.starredRooms)
        : null;
    });

    let position = starredArray.indexOf(channelName);

    let starredArrayUpdated = [...starredArray];
    starredArrayUpdated.splice(position);

    firestore
      .collection("users")
      .doc(authorId)
      // .collection("likedPosts")
      .update({ starredRooms: starredArrayUpdated });
  };
};

export const joinChannel = (channelName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorName = getState().firebase.profile.userName;
    const authorId = getState().firebase.profile.uid;
    let channelId = "";
    let members = "";
    let joinedChannels = getState().firebase.profile.joinedRooms;

    let updatedJoinedRooms = joinedChannels.concat(channelName);

    getState().firestore.ordered.channels.map((channel) => {
      return channel.channelName === channelName
        ? (members = channel.members)
        : null;
    });

    getState().firestore.ordered.channels.map((channel) => {
      return channel.channelName === channelName
        ? (members = channel.members)
        : null;
    });

    getState().firestore.ordered.channels.map((channel) => {
      return channel.channelName === channelName
        ? (channelId = channel.channelId)
        : null;
    });

    let membersArrayUpdated = members.concat(authorName);

    firestore
      .collection("channels")
      .doc(channelId)
      .update({ members: membersArrayUpdated })
      .then(() => {
        return firestore.collection("users").doc(authorId).update({
          joinedRooms: updatedJoinedRooms,
        });
      });
  };
};

export const leaveChannel = (channelName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorName = getState().firebase.profile.userName;
    let channelId = "";
    let members = "";
    let joinedChannels = getState().firebase.profile.joinedRooms;
    const authorId = getState().firebase.profile.uid;

    getState().firestore.ordered.channels.map((channel) => {
      return channel.channelName === channelName
        ? (members = channel.members)
        : null;
    });

    getState().firestore.ordered.channels.map((channel) => {
      return channel.channelName === channelName
        ? (channelId = channel.channelId)
        : null;
    });

    let position = members.indexOf(authorName);

    let membersUpdated = [...members];
    membersUpdated.splice(position);

    let pos = joinedChannels.indexOf(channelName);
    let joinedChannelsUpdated = [...joinedChannels];
    joinedChannelsUpdated.splice(pos);

    firestore
      .collection("channels")
      .doc(channelId)
      // .collection("likedPosts")
      .update({ members: membersUpdated })
      .then(() => {
        firestore.collection("users").doc(authorId).update({
          joinedRooms: joinedChannelsUpdated,
        });
      });
  };
};

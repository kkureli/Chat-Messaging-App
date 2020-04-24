export const sendMessage = (image, text, channelName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const authorId = getState().firebase.auth.uid;
    const authorName = getState().firebase.profile.userName;
    let channelId = "";
    const firebase = getFirebase();
    const imagesPath = "images";
    const firestore = getFirestore();
    let messages = "";

    getState().firestore.ordered.channels.map((channel) => {
      return channel.channelName === channelName
        ? (channelId = channel.channelId)
        : null;
    });

    getState().firestore.ordered.channels.map((channel) => {
      return channel.channelName === channelName
        ? (messages = channel.messages)
        : null;
    });

    if (image === null) {
      let messagesUpdated = messages.concat([
        { sender: authorName, createdAt: new Date(), message: text },
      ]);
      console.log(messagesUpdated, "a");

      return (
        firestore
          .collection("channels")
          .doc(channelId)
          .update({ messages: messagesUpdated })
          .then((docRef) => {
            firestore
              .collection("users")
              .doc(authorId)
              .update({ messages: messagesUpdated });
          })
          // .then(() => {
          //   firestore
          //     .collection("users")
          //     .doc(authorId)
          //     // .collection("UsersLiked")
          //     .update({ posts: postsUpdated });
          // })
          .then(() => {
            dispatch({ type: "CREATE_PUBLIC_TASK", text });
          })
          .catch((err) => {
            dispatch({ type: "CREATE_PUBLIC_TASK_ERROR", text });
          })
      );
    } else {
      return firebase
        .uploadFile(imagesPath, image)
        .then((ret) => ret.uploadTaskSnapshot.ref.getDownloadURL())
        .then((url) =>
          firestore
            .collection("channels")
            .doc(channelId)
            .update({
              messages: messages.concat([
                {
                  sender: authorName,
                  createdAt: new Date(),
                  message: text,
                  imageUrl: url,
                },
              ]),
            })

            // .then(() => {
            //   firestore
            //     .collection("users")
            //     .doc(authorId)
            //     // .collection("UsersLiked")
            //     .update({ posts: postsUpdated });
            // })
            .then(() => {
              dispatch({ type: "CREATE_PUBLIC_TASK", text });
            })
            .catch((err) => {
              dispatch({ type: "CREATE_PUBLIC_TASK_ERROR", text });
            })
        );
    }
  };
};

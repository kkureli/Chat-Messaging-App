const initState = {
  tasks: [{}]
};

const taskReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PUBLIC_TASK":
      console.log("created PUBLIC project", action.projects);
      return state;
    case "CREATE_USER_TASK":
      console.log("created USER project", action.projects);
      return state;
    case "CREATE_PUBLIC_TASK_ERROR":
      console.log("create PUBLIC project error", action.err);
      return state;
    case "CREATE_USER_TASK_ERROR":
      console.log("create USER project error", action.err);
      return state;
    case "DELETE_PROJECTS_SUCCESS":
      console.log("DELETE SUCCESS");
      return state;
    case "DELETE_PROJECT_ERROR":
      console.log("DELETE ERROR");
      return state;
    default:
      return state;
  }
};

export default taskReducer;

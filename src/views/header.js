var headerToken = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

export default headerToken;
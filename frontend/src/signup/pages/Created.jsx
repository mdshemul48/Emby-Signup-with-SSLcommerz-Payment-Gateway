import React, { useEffect } from "react";

const Created = () => {
  useEffect(() => {
    setTimeout(() => {
      window.open(process.env.REACT_APP_EMBY_LINK, "_self");
    }, 3000);
  });
  return (
    <h1 className="created">
      Emby account created successfully. Redirecting to the emby server.
    </h1>
  );
};
export default Created;

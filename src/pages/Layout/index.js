import React from "react";
import Avatar from "@mui/material/Avatar";

function Layout({ children }) {

  return (
    <React.Fragment>
      <div className="h-screen bg-slate-50 overflow-x-hidden">
        <div className="flex flex-row w-screen bg-white px-10 py-4 text-black justify-between">
          <p className="text-2xl text-bold">Task Management</p>

          <Avatar sx={{ width: 32, height: 32 }} src="/broken-image.jpg" />
        </div>
        <div className="overflow-auto py-3 px-6">{children}</div>
      </div>
    </React.Fragment>
  );
}

export default Layout;

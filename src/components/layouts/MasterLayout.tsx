import {
  Outlet,
} from "react-router-dom";

import SideBar from "@components/layouts/SideBar";
import NavBar from "@components/layouts/NavBar";

export default function MasterLayout () {





  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col w-screen overflow-hidden">
        <NavBar/>

        { /* Main Body */ }
        <div className="flex-1 overflow-auto no-scrollbar p-2">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

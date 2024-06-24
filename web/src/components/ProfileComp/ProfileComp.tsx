import React from "react";
import SideNav from "../ui/SideNav/SideNav";
import Profile from "./Profile";
import "./ProfileComp.css";

const ProfileComp: React.FC = () => {
  return (
    <main className="ProfileMain">
      <section className="sidenavProfileSection">
        <article className="sideNavHomeOwnerProfile">
          <SideNav />
        </article>
      </section>
      <section className="rightsideProfileSection">
        <Profile />
      </section>
    </main>
  );
};

export default ProfileComp;

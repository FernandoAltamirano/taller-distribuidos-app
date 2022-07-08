import { Menu, Sidebar } from "./index";

export const Header = () => {
  return (
    <>
      <div className="flex header-component">
        <div />
        <Menu />
      </div>
      <Sidebar signOut={() => { }} />
    </>
  );
};

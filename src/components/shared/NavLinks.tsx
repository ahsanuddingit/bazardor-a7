import { INavLinks } from "@/types/nav-links-type";

import ActiveLink from "./ActiveLink";

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data = await res.json();
  const links: INavLinks[] = data;

  return (
    <div>
      <ActiveLink data={links}></ActiveLink>
    </div>
  );
};

export default NavLinks;

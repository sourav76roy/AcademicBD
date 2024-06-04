import { Link } from "react-router-dom";
import Container from "../Container";
import NavItems from "./NavItems/NavItems";
import Logo from "../Logo";

export default function Header() {
  return (
    <header className="">
      <Container className="!py-0">
        <nav className="flex justify-between items-center py-4">
          <div>
            <Logo />
          </div>

          {/* Menu items */}
            <NavItems />
        </nav>
      </Container>
    </header>
  );
}

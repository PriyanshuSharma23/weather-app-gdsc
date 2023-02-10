import { Switch } from "../Switch/Switch";
import "./topbar.css";

export const Topbar = () => {
  return (
    <header>
      <nav className="topbar__nav">
        <h1 className={"topbar__logo"}>PS</h1>
        <Switch />
      </nav>
    </header>
  );
};

import {ISidebarProps} from "./Sidebar.props";
//import styles from "./Footer.module.css";
import {JSX} from "react";
//import cn from "classnames";

export const Sidebar = ({ ...props}: ISidebarProps): JSX.Element=> {
  return(
      <div {...props}>
          Sidebar
      </div>
  )
};
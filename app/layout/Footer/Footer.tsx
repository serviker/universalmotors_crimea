import {IFooterProps} from "./Footer.props";
import styles from "./Footer.module.css";
import {JSX} from "react";
import cn from "classnames";

export const Footer = ({className, ...props}: IFooterProps): JSX.Element=> {
  return(
      <footer className={cn(className, styles.footer)} {...props}>
          <div>
                OwlTop &copy 2020 - {new Date().getFullYear()} Все права защищены
          </div>
          <a href="#" target="_blank">Пользовательское соглашение</a>
          <a href="#" target="_blank">Политика конфиденциальности</a>
      </footer>
  )
};
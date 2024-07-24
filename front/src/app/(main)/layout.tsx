import {ReactNode} from "react";
import style from "@/app/(main)/layout.module.css";
import NavMenu from "./_component/NavMenu";
import RQProvider from "./_component/RQRovider";

type Props = { children: ReactNode, modal: ReactNode };
export default function AfterLoginLayout({ children, modal }: Props) {

  return (
    <div className={style.container}>
      <RQProvider>
        <main className={style.main}>
          {children}
        </main>
        <div className={style.bottomSectionWrapper}>
          <nav className={style.nav}>
            <NavMenu/>
          </nav>
        </div>
        {modal}
      </RQProvider>
    </div>
  )
}
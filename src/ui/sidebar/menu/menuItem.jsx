
import Image from "next/image";
import styles from './menu.module.css'
import clsx from "clsx";


const MenuItem = ({
    text,
    svgIcon,
    alt = "",
    active = false,
    onClick = ()=>{},
}) => {
    return ( 
        <div className={styles.container} onClick={onClick}>
            <div className={clsx(styles.logoAsideContainer, active ? styles.active : "")}>
              <Image src={svgIcon} alt={alt} className="logo-aside  w-6 h-6 "/>
              <span className={styles.asideText}>{text}</span>
            </div>
        </div>
     );
}
 
export default MenuItem;
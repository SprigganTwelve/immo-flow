
import clsx from "clsx";
import Image from "next/image";
import styles from './dashboard.module.css'
import RoundStep from "@/ui/roundStep/RoundStep";


export default function Home() {
  return (
    <div className={styles.container}>
      
        <div className="glassEffect curves rounded-[20px]" >
              
        </div>

        <div className={clsx(styles.tenants, "glassEffect")}>

        </div>

        <div className={styles.detailContainer}>
          <RoundStep />
          <RoundStep />
          <RoundStep />
          <RoundStep />
        </div>

        <div className="flex justify-between gap-4">
            <div className=" glassEffect w-full h-full"></div>
            <div className=" glassEffect w-full h-full"></div>
        </div>

    </div>
  );
}


import React from 'react';
import styles from './style.module.css'

interface StatusBadgesProps{
    gap?: string;
    fontSize?: string;
    height?: string;
    children: React.ReactNode
}


const StatusBadges: React.FC<StatusBadgesProps> = ({ children, gap, height, fontSize }) => {
    return <div style={{ ['--space-between' as any]: gap ?? "0.5rem", height, fontSize }} className={styles.details}>{children}</div>;
};

 
export default StatusBadges;
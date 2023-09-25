import GuestIcon from '../../../Assets/Images/Guest.png';
import BattlegroundsIcon from '../../../Assets/Images/Battlegrounds.webp'
import StandardIcon from '../../../Assets/Images/Standard.webp';
import ClassicIcon from '../../../Assets/Images/Classic.webp';
import MercenariesIcon from '../../../Assets/Images/Mercenaries.webp';
import ArenaIcon from '../../../Assets/Images/Arena.webp';
import TwistIcon from '../../../Assets/Images/Twist.webp';
import WildIcon from '../../../Assets/Images/Wild.webp';

import styles from "./Sidebar.module.css";

import { Avatar, Text, Divider } from 'dracula-ui';
 
export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.user}>
        <Avatar
          src={GuestIcon}
          title="Guest User"
          color="white" />
        <Text size='lg' weight="semibold">Guest</Text>
      </div>
      <Divider style={{ width: "90%"}}/>
      <div className={styles['game-mode']}>
        <img src={BattlegroundsIcon} alt="BattlegroundsIcon" loading='lazy' />
        <Text size='lg' style={{display: "flex", alignItems: "center"}}>Battlegrounds</Text>
      </div>
      <div className={styles['game-mode']}>
        <img src={StandardIcon} alt="StandardIcon" loading='lazy' />
        <Text size='lg' style={{display: "flex", alignItems: "center"}}>Standard</Text>
      </div>
      <div className={styles['game-mode']}>
        <img src={ClassicIcon} alt="ClassicIcon" loading='lazy' />
        <Text size='lg' style={{display: "flex", alignItems: "center"}}>Classic</Text>
      </div>
      <div className={styles['game-mode']}>
        <img src={MercenariesIcon} alt="MercenariesIcon" loading='lazy' />
        <Text size='lg' style={{display: "flex", alignItems: "center"}}>Mercenaries</Text>
      </div>
      <div className={styles['game-mode']}>
        <img src={ArenaIcon} alt="ArenaIcon" loading='lazy' />
        <Text size='lg' style={{display: "flex", alignItems: "center"}}>Arena</Text>
      </div>
      <div className={styles['game-mode']}>
        <img src={TwistIcon} alt="TwistIcon" loading='lazy' />
        <Text size='lg' style={{display: "flex", alignItems: "center"}}>Twist</Text>
      </div>
      <div className={styles['game-mode']}>
        <img src={WildIcon} alt="WildIcon" loading='lazy' />
        <Text size='lg' style={{display: "flex", alignItems: "center"}}>Wild</Text>
      </div>
    </div>
  );
}
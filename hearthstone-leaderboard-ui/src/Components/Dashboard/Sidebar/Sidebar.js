import {
  Card,
  List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";

import GuestIcon from '../../../Assets/Images/Guest.png';
import BattlegroundsIcon from '../../../Assets/Images/Battlegrounds.webp';
import StandardIcon from '../../../Assets/Images/Standard.webp';
import ClassicIcon from '../../../Assets/Images/Classic.webp';
import MercenariesIcon from '../../../Assets/Images/Mercenaries.webp';
import ArenaIcon from '../../../Assets/Images/Arena.webp';
import TwistIcon from '../../../Assets/Images/Twist.webp';
import WildIcon from '../../../Assets/Images/Wild.webp';

import { Avatar, Text } from 'dracula-ui';
 
export function DefaultSidebar() {
  return (
    <Card className="h-[calc(100vh)] w-full max-w-[18rem] p-6" style={{ backgroundColor: "#21222c", alignSelf: "center"}} >
      <div>
        <Avatar color="white" title="Guest" src={GuestIcon} style={{ marginLeft: "5rem" }}/>
        <div style={{ marginLeft: "5.7rem" }}>
          <Text color="white">Guest</Text>
        </div>
      </div>
      <hr style={{ color: "#f8f8f2", opacity: 0.5, marginTop: "1rem" }} className="py-1" />
      <List>
        <ListItem style={{ color: "white" }} className="-m-2 p-6">
          <ListItemPrefix className="h-2">
            <img
              src={BattlegroundsIcon}
              alt="BattlegroundsIcon"
              width={40} />
          </ListItemPrefix>
          <Text className="px-11">Battlegrounds</Text>
        </ListItem>
        <ListItem style={{ color: "white" }} className="m-1 p-4">
          <ListItemPrefix className="h-2">
            <img
              src={StandardIcon}
              alt="StandardIcon"
              width={30} />
          </ListItemPrefix>
          <Text className="px-10">Standard</Text>
        </ListItem>
        <ListItem style={{ color: "white" }} className="-m-1 p-6">
          <ListItemPrefix className="h-2">
            <img
              src={ClassicIcon}
              alt="ClassicIcon"
              width={30} />
          </ListItemPrefix>
          <Text className="px-10">Classic</Text>
        </ListItem>
        <ListItem style={{ color: "white" }} className="-m-1 p-5 px-5">
          <ListItemPrefix className="h-2">
            <img
              src={MercenariesIcon}
              alt="MercenariesIcon"
              width={40} />
          </ListItemPrefix>
          <Text className="px-11">Mercenaries</Text>
        </ListItem>
        <ListItem style={{ color: "white" }} className="-m-2 p-6 py-7">
          <ListItemPrefix className="h-2">
            <img
              src={ArenaIcon}
              alt="ArenaIcon"
              width={40} />
          </ListItemPrefix>
          <Text className="px-11">Arena</Text>
        </ListItem>
        <ListItem style={{ color: "white" }} className="-m-2 p-6">
          <ListItemPrefix className="h-2">
            <img
              src={TwistIcon}
              alt="TwistIcon"
              width={40} />
          </ListItemPrefix>
          <Text className="px-11">Twist</Text>
        </ListItem>
        <ListItem style={{ color: "white" }} className="-m-2 p-6">
          <ListItemPrefix className="h-2">
            <img
              src={WildIcon}
              alt="WildIcon"
              width={40} />
          </ListItemPrefix>
          <Text className="px-11">Wild</Text>
        </ListItem>
      </List>
    </Card>
  );
}
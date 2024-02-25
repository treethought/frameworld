import {
  faArrowRightFromBracket,
  faBackwardStep,
  faCartShopping,
  faChevronDown,
  faCircleExclamation,
  faCircleQuestion,
  faClock,
  faCommentAlt,
  faCompress,
  faDollarSign,
  faEllipsisVertical,
  faExpand,
  faForwardStep,
  faHeadphones,
  faHeart,
  faImage,
  faList,
  faMagnifyingGlass,
  faMoon,
  faMusic,
  faPause,
  faPenToSquare,
  faPlay,
  faRightLeft,
  faShare,
  faSliders,
  faSquarePlus,
  faSun,
  faTv,
  faUpRightAndDownLeftFromCenter,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
};


export function CommentIcon(props: Props) {
  return <FontAwesomeIcon icon={faCommentAlt} {...props} />;
}

export function RespostIcon(props: Props) {
  return <FontAwesomeIcon icon={faRightLeft} {...props} />;
}

export function CollectIcon(props: Props) {
  return <FontAwesomeIcon icon={faSquarePlus} {...props} />;
}

export function LikeIcon(props: Props) {
  return <FontAwesomeIcon icon={faHeart} {...props} />;
}

export function PlayIcon(props: Props) {
  return <FontAwesomeIcon icon={faPlay} {...props} />;
}

export function PauseIcon(props: Props) {
  return <FontAwesomeIcon icon={faPause} {...props} />;
}

export function SkipNextIcon(props: Props) {
  return <FontAwesomeIcon icon={faForwardStep} {...props} />;
}

export function SkipPreviousIcon(props: Props) {
  return <FontAwesomeIcon icon={faBackwardStep} {...props} />;
}

export function ShareIcon(props: Props) {
  return <FontAwesomeIcon icon={faShare} {...props} />;
}

export function HelpIcon(props: Props) {
  return <FontAwesomeIcon icon={faCircleQuestion} {...props} />;
}

export function CircleExlamationIcon(props: Props) {
  return <FontAwesomeIcon icon={faCircleExclamation} {...props} />;
}

export function SettingsIcon(props: Props) {
  return <FontAwesomeIcon icon={faSliders} {...props} />;
}

export function LogoutIcon(props: Props) {
  return <FontAwesomeIcon icon={faArrowRightFromBracket} {...props} />;
}

export function ArtworkIcon(props: Props) {
  return <FontAwesomeIcon icon={faImage} {...props} />;
}

export function QueueIcon(props: Props) {
  return <FontAwesomeIcon icon={faList} {...props} />;
}

export function HeadphonesIcon(props: Props) {
  return <FontAwesomeIcon icon={faHeadphones} {...props} />;
}

export function VideoIcon(props: Props) {
  return <FontAwesomeIcon icon={faTv} {...props} />;
}

export function OpenFullIcon(props: Props) {
  return <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} {...props} />;
}

export function MusicIcon(props: Props) {
  return <FontAwesomeIcon icon={faMusic} {...props} />;
}
export function PersonIcon(props: Props) {
  return <FontAwesomeIcon icon={faUserLarge} {...props} />;
}

export function ArrowDownIcon(props: Props) {
  return <FontAwesomeIcon icon={faChevronDown} {...props} />;
}

export function ExpandIcon(props: Props) {
  return <FontAwesomeIcon icon={faExpand} {...props} />;
}

export function EditIcon(props: Props) {
  return <FontAwesomeIcon icon={faPenToSquare} {...props} />;
}

export function CloseFullscreenIcon(props: Props) {
  return <FontAwesomeIcon icon={faCompress} {...props} />;
}

export function VerticalEllipsisIcon(props: Props) {
  return <FontAwesomeIcon icon={faEllipsisVertical} {...props} />;
}

export function ClockIcon(props: Props) {
  return <FontAwesomeIcon icon={faClock} {...props} />;
}

export function DollarIcon(props: Props) {
  return <FontAwesomeIcon icon={faDollarSign} {...props} />;
}

export function CartIcon(props: Props) {
  return <FontAwesomeIcon icon={faCartShopping} {...props} />;
}

export function SearchIcon(props: Props) {
  return <FontAwesomeIcon icon={faMagnifyingGlass} {...props} />;
}

export function BrightnessIcon(props: Props) {
  return <FontAwesomeIcon icon={faSun} {...props} />;
}

export function DarknessIcon(props: Props) {
  return <FontAwesomeIcon icon={faMoon} {...props} />;
}

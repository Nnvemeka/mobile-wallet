import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface HomeCardProps {
  Icon: IconType;
  title: string;
  description: string;
  href: string;
}

const HomeCard = ({ Icon, title, description, href }: HomeCardProps) => {
  return (
    <Link to={href}>
      <div className="home-card-container">
        <div className="home-card-header">
          <Icon color="#e92a2a" size={"3.5rem"} />
          <h3 className="home-card-title">{title}</h3>
        </div>
        <p className="home-card-description">{description}</p>
      </div>
    </Link>
  );
};

export default HomeCard;

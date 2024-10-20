interface BillsItemProps {
  image: string;
  onClick?: () => void;
}

const BillsItem = ({ image, onClick }: BillsItemProps) => {
  return (
    <div className="bills-item-card" onClick={onClick}>
      <div className="bills-item-card-wrapper">
        <img src={image} alt="logo" width={"40px"} height={"30px"} />
      </div>
    </div>
  );
};

export default BillsItem;

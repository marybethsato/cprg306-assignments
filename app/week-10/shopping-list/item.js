import DeleteButton from "./delete-button";

const Item = ({ name, quantity, category, onSelect, onDelete }) => {
    return (
        <li className="flex flex-row justify-between  m-4 ">
            <div className="p-2 mr-2 bg-slate-900 max-w-sm hover:bg-orange-800 cursor-pointer flex-grow" onClick={onSelect}>
                <div>
                    <h2 className="text-xl font-bold">{name}</h2>
                    <div className="text-sm">Buy {quantity} in {category}</div>
                </div>

            </div>
            <DeleteButton onClick={onDelete}></DeleteButton>
        </li>

    );
};

export default Item;
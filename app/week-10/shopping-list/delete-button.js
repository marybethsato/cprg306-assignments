import { TrashIcon } from "@heroicons/react/outline";

function DeleteButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center"
            aria-label="Delete"
        >
            <TrashIcon className="h-5 w-5" />

        </button>
    );
}

export default DeleteButton;

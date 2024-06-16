import { Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FavoritesContext } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

interface Favorite {
  id: number;
  name: string;
}

interface AddFavoriteBtnProps {
  setAddClicked: React.Dispatch<React.SetStateAction<boolean>>;
  addClicked: boolean;
  value: string;
  addFavorite: (city: string) => Promise<void>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const AddFavoriteBtn: React.FC<AddFavoriteBtnProps> = ({
  setAddClicked,
  addClicked,
  value,
  addFavorite,
  setValue,
}) => {
  const handleClick = async () => {
    if (value === "" || value.length < 1) return;
    await addFavorite(value);
    setAddClicked(false);
    setValue("");
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        className="w-max px-2 py-1 bg-blue-500 text-white rounded shadow mt-4"
        onClick={addClicked ? handleClick : () => setAddClicked(true)}
      >
        {addClicked ? "Done" : "Add City"}
      </button>
      {addClicked && (
        <button
          className="w-max px-2 py-1 bg-red-500 text-white rounded shadow mt-4"
          onClick={() => {
            setAddClicked(false);
            setValue("");
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

const Favorite: React.FC = () => {
  const { favorites, deleteFavorite, addFavorite } = useContext(
    FavoritesContext
  ) as any;
  const [addClicked, setAddClicked] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const makeUppercase = (val: string) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/favorites");
      if (res.status === 200) {
        console.log(await res.json());
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    await deleteFavorite(id);
  };

  return (
    <>
      <div
        className="bg-gray-200 font-medium dark:bg-[#2B282E] p-3 flex items-center justify-center text-black dark:text-white rounded-md gap-2 cursor-pointer"
        onClick={showModal}
      >
        <MdFavorite />
        <span>Favorites</span>
      </div>
      <Modal
        title="Favorite Cities"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{ backgroundColor: "black" }}
      >
        {favorites.length > 0 ? (
          favorites.map((favorite: Favorite, index: number) => (
            <div
              key={index}
              className="text-base font-medium bg-gray-200 p-2 rounded mt-2 cursor-pointer flex justify-between items-center"
              onClick={() => {
                localStorage.setItem("city", favorite.name);
                navigate("/forecast");
              }}
            >
              <p>{makeUppercase(favorite.name)}</p>
              <div className="flex gap-4 items-center">
                <FaTrash
                  className="text-red-600 text-sm cursor-pointer"
                  onClick={(e) => handleDelete(e, favorite.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold text-center mt-3">
            No Favorite Cities
          </p>
        )}
        {addClicked && (
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium"
            placeholder="Enter city name"
          />
        )}
        <AddFavoriteBtn
          setAddClicked={setAddClicked}
          addClicked={addClicked}
          value={inputVal}
          addFavorite={addFavorite}
          setValue={setInputVal}
        />
      </Modal>
    </>
  );
};

export default Favorite;

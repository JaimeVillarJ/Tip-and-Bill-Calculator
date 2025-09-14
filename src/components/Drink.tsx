import type { drink } from "../types/types";

interface Props {
  item : drink,
  drinks : drink[],
  setConsumed: React.Dispatch<React.SetStateAction<drink[]>>
}

export const Drink = ({ item, drinks, setConsumed }: Props ) => {

  const drinkItem : drink = {
    id : item.id,
    name : item.name,
    price : item.price
  }

  function TryConsole(){
    setConsumed([...drinks, drinkItem])
    console.log("Objeto agregado");
  }

  return (
    <div 
      key={item.id} 
      className="flex w-80 justify-between border-blue-200 border-3 rounded-md p-1 hover:scale-105 cursor-pointer transition duration-400  hover:bg-amber-500" 
      onClick={TryConsole} 
    >
      <h3 className="font-serif">{item.name}</h3>
      <h3 className="font-serif font-black ">${item.price}</h3>
    </div>
  );
}


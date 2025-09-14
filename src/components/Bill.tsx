import { useState, useMemo } from "react";
import type { drink } from "../types/types";

interface Props {
    consume : drink[],
    setConsumed: React.Dispatch<React.SetStateAction<drink[]>>
}

export const Bill = ({consume, setConsumed} : Props) => {

    const [tip, setTip] = useState<number | null>(null);

    // Contar cantidades de cada bebida
    const counts: Record<number, { item: drink; quantity: number }> = {};
    consume.forEach((item) => {
        if (counts[item.id]) {
            counts[item.id].quantity += 1;
        } else {
            counts[item.id] = { item, quantity: 1 };
        }
    });
    const uniqueItems = Object.values(counts);

    // Eliminar bebida por id
    function remove(id : number){
        setConsumed(consume.filter(item => item.id !== id));
    }

    // Manejar selección/deselección de propina
    const handleChange = (value: number) => {
        if (tip === value) {
            setTip(null);
            console.log("Propina deseleccionada");
        } else {
            setTip(value);
            console.log(`Propina seleccionada: ${value}%`);
        }
    };

    // Calcular subtotal y total usando useMemo
    const subtotal = useMemo(() => 
        uniqueItems.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0)
    , [uniqueItems]);

    const total = useMemo(() => 
        tip ? subtotal + (subtotal * tip) / 100 : subtotal
    , [subtotal, tip]);

    return (
        <div className="border-3 border-blue-200 rounded-2xl w-120">
            {consume.length === 0 ? 
                <h1 className="text-center pt-5">No products</h1>
            :
                <>
                    <h1 className="m-4 font-black text-3xl">Consumed</h1>
                    {uniqueItems.map(({ item, quantity}) => (
                        <div key={item.id} className="border-b border-gray-300 pb-2 mb-2 ml-4 mr-4">
                            <div className="flex justify-between">
                                <div className="flex gap-1 font-serif">
                                    <p>{item.name}</p> - 
                                    <p>{`$${item.price}`}</p>
                                </div>
                                <div className="mr-4">
                                    <p 
                                        onClick={() => remove(item.id)} 
                                        className="bg-red-500 w-6 text-center rounded-2xl text-white font-black cursor-pointer transition duration-400 hover:bg-red-700"
                                    >
                                        X
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-0.5 font-black">
                                <p>Amount</p> - 
                                <p>{quantity}</p> - 
                                <p>{`$${item.price * quantity}`}</p>
                            </div>
                        </div>
                    ))}
                    <h1 className="ml-4 mt-6 font-black text-lg">Propina</h1>
                    <div className="flex ml-4 mr-4 gap-2 border-b border-gray-300 pb-3">
                        {[10, 20, 50].map((value) => (
                            <label key={value} className="flex items-center gap-1 cursor-pointer">
                                <p>{value}%</p>
                                <input
                                    type="checkbox"
                                    checked={tip === value}
                                    onChange={() => handleChange(value)}
                                    className="rounded-3xl cursor-pointer"
                                />
                            </label>
                        ))}
                    </div>
                    <div className="ml-4 mt-6 mb-6 flex flex-col gap-1">
                        <h1 className="text-lg font-black">Total and Till</h1>
                        <p>Subtotal to pay: ${subtotal}</p>
                        <p>Tip ({tip ?? 0}%): ${tip ? (subtotal * tip) / 100 : 0}</p>
                        <p>Total to pay: ${total}</p>
                    </div>
                </>
            }
        </div>
    )
}

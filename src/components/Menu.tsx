import axios from "axios";
import { Drink } from "./Drink";
import { useEffect, useState } from "react";
import type { drink } from "../types/types";
import { Bill } from "../components/Bill";

export const Menu = () => {
  const [menu, setMenu] = useState<drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [consumed, setConsumed] = useState<drink[]>([]);

  const API_LINK = import.meta.env.VITE_DEV_API_LINK;

  useEffect(() => {
    if (!API_LINK) {
      console.error("API_LINK is undefined");
      setLoading(false);
      return;
    }

    axios
      .get(`${API_LINK}/api/menu`)
      .then((response) => {
        const data = response.data;
        // Aseguramos que siempre sea un array
        setMenu(Array.isArray(data) ? data : data.menu || []);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex m-3.5 gap-2 p-4 justify-center">
      <div className="flex flex-col gap-2 mr-30.5 mb-10">
        <h1 className="font-black text-3xl mb-5">Menú</h1>
        {loading ? (
          <p>loading...</p>
        ) : (
          menu.map((item) => (
            <Drink
              key={item.id}
              item={item}
              drinks={consumed}
              setConsumed={setConsumed}
            />
          ))
        )}
      </div>
      <Bill consume={consumed} setConsumed={setConsumed} />
    </div>
  );
};

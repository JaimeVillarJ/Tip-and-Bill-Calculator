import axios from "axios"
import { Drink } from "./Drink"
import { useEffect, useState } from "react"
import type { drink } from "../types/types";
import { Bill } from "../components/Bill";

export const Menu = () => {

  const [menu, setMenu] = useState<drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [consumed, setConsumed] = useState<drink[]>([]);

  const API_LINK = import.meta.env.VITE_DEV_API_LINK;

  useEffect(() => {
    axios.get(`${API_LINK}/api/menu`)
    .then(response => {
      setMenu(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error to get drinks", error);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="flex m-3.5 gap-2 p-4 justify-center">
        <div className="flex flex-col gap-2 mr-30.5 mb-10">
          <h1 className="font-black text-3xl mb-5">Menú</h1>
          {
            loading ? 
              <p>loading...</p> 
            :
            menu.map((item) => (
              <Drink
                item = {item}
                drinks={consumed}
                setConsumed = {setConsumed}
              />
            ))
          }    
        </div>
          <Bill 
            consume={consumed}
            setConsumed={setConsumed}
          /> 
      </div>
    </>
    
  )
}

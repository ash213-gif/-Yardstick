import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const createcontext = createContext()

export default function Context() {

    const [state, setstate] = useState()

    useEffect(() => {
        const getdata = () => {
            try {

            } catch (err) { console.log(err); }
        }
    }, [])

    return (
   <> </>
  )
}

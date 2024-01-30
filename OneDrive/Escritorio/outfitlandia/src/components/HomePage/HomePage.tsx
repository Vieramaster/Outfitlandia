import "./HomePage.css"
import React, { useState } from "react"
import { useDatabase } from "../arrayHooks/arrayHooks"
import SelectionClothes from "../SelectionClothes/SelectionClothes"
import SelectionGarment from "../SelectionGarment/SelectionGarment"
import Weather from "../Weather/Weather"

const HomePage = () =>{
  const [garmentClickId, setGarmentClickId] = useState("null")
  const [garmentCards, setGarmentCards] = useState([])
  
  const defaultGarmentButtons = [
    {
        css: "big",
        src: "/src/images/default/top.webp",
        name: "default-top",
        garment: "top",
        nameButton: "parte superior",
        key: "default-top",
      },
      {
        css: "big",
        src: "/src/images/default/coat.webp",
        name: "default-coat",
        garment: "coat",
        nameButton: "abrigo",
        key: "default-coat",
      },
      {
        css: "big",
        src: "/src/images/default/pants.webp",
        name: "default-pants",
        garment: "pants",
        nameButton: "pantalones",
        key: "default-pants",
      },
      {
        css: "small",
        src: "/src/images/default/necklace.webp",
        name: "default-necklace",
        garment: "necklace",
        nameButton: "collar",
        key: "default-necklace",
      },
      {
        css: "small",
        src: "/src/images/default/watch.webp",
        name: "default-watch",
        garment: "watch",
        nameButton: "reloj",
        key: "default-watch",
      },
      {
        css: "small",
        src: "/src/images/default/belt.webp",
        name: "default-belt",
        garment: "belt",
        nameButton: "cinturón",
        key: "default-belt",
      },
      {
        css: "small",
        src: "/src/images/default/shoes.webp",
        name: "default-shoes",
        garment: "shoes",
        nameButton: "calzado",
        key: "default-shoes",
      },
  ]
    //setea si se usa los botones default o se actualizan
    const filteredGarmentButtons = defaultGarmentButtons

    //sustraigo el id de selectionGarment
    const handleGarmentClick = (id: string) => {
      setGarmentClickId(id)
    };

    const { data } = useDatabase();
    //mando para info para mapear SelectionClothes

      const arrayFiltered = data.filter(item => item.garment === garmentClickId)

    setGarmentCards(arrayFiltered)

    return(
      <section className="HomePage">
      <div className="HomePage--box">
      <SelectionGarment garmentButtons={filteredGarmentButtons} onGarmentClick={handleGarmentClick} />
        <Weather />s
        <SelectionClothes/>

      </div>
    </section>
    )
}

export default HomePage
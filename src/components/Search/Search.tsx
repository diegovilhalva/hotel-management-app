'use client'
import { useRouter } from "next/navigation"
import { ChangeEvent, FC } from "react"

type Props = {
    roomTypeFilter:string
    searchQuery:string,
    setRoomTypeFilter:(value:string) => void
    setSearchQuery:(value: string) => void
}


const Search: FC<Props> = ({roomTypeFilter,searchQuery,setRoomTypeFilter,setSearchQuery}) => {
    const router = useRouter()
    const handleRoomTypeChange = (event:ChangeEvent<HTMLSelectElement>) => {
        setRoomTypeFilter(event.target.value)
    }
    const handleSearchQueryChange = (event:ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const handleFilterClick = () => {
        router.push(`/rooms/?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`)
    }
    
  return (
    <section className="bg-tertiary-light px-4 py-6 rounded-lg">
        <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 lg:w-auto mb-4 md:mb-0">
                <label className="block text-sm font-medium mb-2 text-black">
                    Tipo de Quarto
                </label>
                <div className="relative ">
                    <select 
                    value={roomTypeFilter} onChange={handleRoomTypeChange} 
                    className="w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none">
                        <option value="All">Todos</option>
                        <option value="Basic">Básico</option>
                        <option value="Suite">Suite</option>
                        <option value="Luxury">Luxo</option>
                    </select>
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-auto mb-4 md:mb-0 ">
                <label className="block text-sm font-medium mb-2 text-black">
                    Pequisar
                </label>
                <input type="search" id="search" placeholder="Pesquisar no site" 
                className="w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white" 
                value={searchQuery} onChange={handleSearchQueryChange} 
                />
            </div>
            <button className="btn-primary" type="button"
            onClick={handleFilterClick}
            >
                Pesquisar
            </button>
        </div>
    </section>
  )
}

export default Search
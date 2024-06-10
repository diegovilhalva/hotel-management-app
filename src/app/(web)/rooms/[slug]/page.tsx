'use client'
import useSWR from "swr"
import { getRoom } from "@/libs/apis"
import LoadingSpinner from "../../loading"
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery"
import { MdOutlineCleaningServices } from "react-icons/md"
import { LiaFireExtinguisherSolid } from "react-icons/lia"
import { AiOutlineMedicineBox } from "react-icons/ai"
import { GiSmokeBomb } from "react-icons/gi"
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta"
import { useState } from "react"


const RoomDetails = (props: { params: { slug: string } }) => {
    const {
        params: { slug }
    } = props

    const [checkinDate,setCheckinDate] = useState<Date | null>(null)
    const [checkoutDate,setCheckoutDate] = useState<Date | null>(null)
    const fetchRoom = async () => getRoom(slug)
    const { data: room, error, isLoading } = useSWR('/api/room', fetchRoom)
    if (error) throw new Error("Não foi possível carregar os dados")
    if (typeof room === 'undefined' && !isLoading) throw new Error("Não foi possível carregar os dados")
    if (!room) return <LoadingSpinner />;

    const calcminCheckoutDate = () => {
        if (checkinDate) {
            const nextDay = new Date(checkinDate)
            nextDay.setDate(nextDay.getDate() + 1)
            return nextDay
        }
        return null
    }
    return (
        <div>
            <HotelPhotoGallery photos={room.images} />
            <div className="container mx-auto mt-2">
                <div className="md:grid  md:grid-cols-12 gap-10 px-3">
                    <div className="md:col-span-8 md:w-full">
                        <div className="">
                            <h2 className="font-bold text-left text-lg md:text-2xl">
                                {room.name} ({room.dimension})
                            </h2>
                            <div className="flex my-11">
                                {room.offeredAmenities.map(ammenity => (
                                    <div key={ammenity._key} className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center">
                                        <i className={`fa-solid ${ammenity.icon} md:text-2xl`}></i>
                                        <p className="text-xs md:text-base pt-3">{ammenity.amenity}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-11">
                                <h2 className="font-bold text-3xl mb-2">Detalhes</h2>
                                <p className="">{room.description}</p>
                            </div>
                            <div className="mb-11">
                                <h2 className='font-bold text-3xl mb-2'>Amenities</h2>
                                <div className='grid grid-cols-2'>
                                    {room.offeredAmenities.map(amenity => (
                                        <div
                                            key={amenity._key}
                                            className='flex items-center md:my-0 my-1'
                                        >
                                            <i className={`fa-solid ${amenity.icon}`}></i>
                                            <p className='text-xs md:text-base ml-2'>
                                                {amenity.amenity}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-11">
                                <h2 className="font-bold text-3xl mb-2">Segurança e Higiene</h2>
                                <div className="grid grid-cols-2">
                                    <div className="flex items-center my-1 md:my-0">
                                        <MdOutlineCleaningServices />
                                        <p className="ml-2 md:text-base text-xs">Limpeza Diária</p>
                                    </div>
                                    <div className='flex items-center my-1 md:my-0'>
                                        <LiaFireExtinguisherSolid />
                                        <p className='ml-2 md:text-base text-xs'>
                                            Prevenção contra incêndios
                                        </p>
                                    </div>
                                    <div className='flex items-center my-1 md:my-0'>
                                        <AiOutlineMedicineBox />
                                        <p className='ml-2 md:text-base text-xs'>
                                            Ambiente dedetizado e esterilizado
                                        </p>
                                    </div>
                                    <div className='flex items-center my-1 md:my-0'>
                                        <GiSmokeBomb />
                                        <p className='ml-2 md:text-base text-xs'>Detectores de fumaça</p>
                                    </div>
                                </div>
                            </div>
                            <div className="shadow dark:shadow-white rounded-lg p-6">
                                <div className="items-center font-semibold">
                                    <p className="md:text-lg font-semibold">Avaliações dos Clientes</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit">
                        <BookRoomCta discount={room.discount} price={room.price} 
                        specialNote={room.specialNote} checkinDate={checkinDate} setCheckinDate={setCheckinDate} checkoutDate={checkoutDate} setCheckoutDate={setCheckoutDate} calcminCheckoutDate={calcminCheckoutDate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails
import { formatToBRL } from "@/libs/formatToBrl"
import { Room } from "@/models/room"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

type Props = {
    room:Room
}

const RoomCard: FC<Props> = props => {
  const {room:{coverImage,name,price,type,description,isBooked,slug}} = props
  return (
    <div className="rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black">
      <div className="h-60 overflow-hidden">
        <Image src={coverImage.url} alt={name} width={250} height={250} className="img scale-animation" />
      </div>
        <div className="p-4 bg-white">
          <div className="flex justify-between text-2xl font-semibold">
            <p>{name}</p>
          
          </div>
          <p>{formatToBRL(price)} diária</p>
          <p className="pt-2 text-xs">Tipo:{type}</p>
          <p className="pt-3 pb-6">{description.slice(0,100)}...</p>
          <Link href={`/rooms/${slug.current}`} className="bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500" >
            {isBooked ? "Reservado" :"Reservar"}
          </Link>
        </div>
    </div>
  )
}

export default RoomCard
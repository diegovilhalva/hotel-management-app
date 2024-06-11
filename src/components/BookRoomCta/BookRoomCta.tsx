'use client'

import { formatToBRL } from "@/libs/formatToBrl";
import { Dispatch, FC, SetStateAction } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ptBR } from "date-fns/locale/pt-BR"

registerLocale('ptBR', ptBR)

type Props = {
    checkinDate: Date | null;
    checkoutDate: Date | null;
    setCheckinDate: Dispatch<SetStateAction<Date | null>>;
    setAdults:Dispatch<SetStateAction<number>>;
    setChildren:Dispatch<SetStateAction<number>>
    setCheckoutDate:Dispatch<SetStateAction<Date | null>>;
    calcminCheckoutDate:() => Date | null;
    price: number;
    discount: number;
    adults:number;
    children:number;
    specialNote: string;
    isBooked:boolean;
    handleBookNowClick:() => void
}

const BookRoomCta: FC<Props> = props => {
    const { price, discount, specialNote, checkinDate, setCheckinDate ,checkoutDate,setCheckoutDate,calcminCheckoutDate,setAdults,adults,setChildren,children,isBooked,handleBookNowClick} = props
    const discountPrice = price - (price / 100) * discount 
    const calcNoOfDays =() => {
        if(!checkinDate || !checkoutDate) return 0;
        const timeDiff = checkoutDate.getTime() - checkinDate.getTime()
        const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000))
        return noOfDays
    }
   

    return (
        <div className="px-7 py-6">
            <h3>
                <span className={`${discount ? 'text-gray-400 line-through' : ''} font-bold text-xl`}>
                    {formatToBRL(price)}
                </span>
                {discount ? <span className="font-bold text-xl ">
                    <br />
                    Desconto de {discount}%
                    <span className="text-tertiary-dark ml-1">{formatToBRL(discountPrice)}</span></span> : ''}
            </h3>
            <h4 className="my-8">{specialNote}</h4>
            <div className="flex">
                <div className="w-1/2 pr-2">
                    <label htmlFor="check-in-date" className="block text-sm font-medium to-gray-900 dark:text-gray-400">Check In</label>
                    <DatePicker locale={'ptBR'} selected={checkinDate} onChange={date => setCheckinDate(date)} minDate={new Date()} id="check-in-date" className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary" dateFormat={'dd/MM/yyyy'} />
                </div>
                <div className="w-1/2 pl-2">
                    <label htmlFor="check-out-date" className="block text-sm font-medium to-gray-900 dark:text-gray-400">Check Out</label>
                    <DatePicker locale={'ptBR'} selected={checkoutDate} onChange={date => setCheckoutDate(date)} minDate={calcminCheckoutDate()} id="check-out-date" className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary" dateFormat={'dd/MM/yyyy'} 
                    disabled={!checkinDate} />
                </div>
            </div>
            <div className="flex mt-4">
                <div className="w-1/2 pr-2">
                    <label htmlFor="adults" className="block text-sm font-medium text-gray-800 dark:text-gray-400">
                        Adultos
                    </label>
                    <input type="number"  id="adults" value={adults} 
                    onChange={(e) => setAdults(+e.target.value)} min={1} max={5} className="w-full border border-gray-300 rounded-lg p-2.5 text-black" />
                </div>
                <div className="w-1/2 pl-2">
                    <label htmlFor="children" className="block text-sm font-medium text-gray-800 dark:text-gray-400">
                       Crianças
                    </label>
                    <input type="number"  id="children" value={children} 
                    onChange={(e) => setChildren(+e.target.value)} min={0} max={5} className="w-full border border-gray-300 rounded-lg p-2.5 text-black" />
                </div>
            </div>
            {calcNoOfDays() > 0 ? <p className="mt-3">
                Total: {formatToBRL(calcNoOfDays() * discountPrice)}
            </p> :<></> }
            <button disabled={isBooked} onClick={handleBookNowClick} className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isBooked ? 'Reservado' :'Reservar'}
            </button>
        </div>
    )
}

export default BookRoomCta
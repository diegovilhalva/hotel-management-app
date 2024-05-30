import Link from 'next/link'
import React from 'react'
import { BsFillSendFill, BsTelephoneOutbound } from 'react-icons/bs'
import { FaWhatsappSquare } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa6'
import { MdWhatsapp } from 'react-icons/md'

const Footer = () => {
    return (
        <footer className='mt-16'>
            <div className="container mx-auto px-4">
                <Link href={'/'} className='font-black text-tertiary-dark'>
                    Hotel Aurora
                </Link>
                <h4 className='font-semibold text-[40px] py-6'>Contato</h4>
                <div className="flex flex-wrap gap-16 items-center justify-between">
                    <div className="flex-1">
                        <p>Avenida das Flores, 1234</p>
                        <div className="flex items-center py-4">
                            <BsFillSendFill/>
                            <p className="ml-2">
                                contato@hotelaurora.com
                            </p>
                        </div>
                        <div className="flex items-center">
                            <BsTelephoneOutbound/>
                            <p className="ml-2">
                                (41) 3322-3525
                            </p>
                        </div>
                        <div className="flex items-center py-4">
                            <MdWhatsapp/>
                            <p className="ml-2">
                                (41) 99999-9999
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 md:text-right">
                        <p className="pb-4">Produtos</p>
                        <p className="pb-4">Como chegar</p>
                        <p className="pb-4">Politíca de privacidade</p>
                        <p className="pb-4">Termos & Condições</p>
                        <p>Atendimento ao Cliente</p>
                    </div>
                    <div className="flex-1 md:text-right">
                        <p className="pb-4">Restaurante</p>
                        <p className="pb-4">Academia</p>
                        <p className="pb-4">Esportes</p>
                        <p>Eventos</p>
                    </div>
                </div>
            </div>
            <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0 flex items-center justify-center">
                <p className="text-black">&copy;2024 | Diego Vilhalva</p>
            </div>
        </footer>
    )
}

export default Footer
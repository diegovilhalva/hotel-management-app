import Stripe from "stripe"
import { getRoom } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10'
})

type RequestData = {
    checkinDate: string;
    checkoutDate: string;
    adults: number;
    children: number;
    numberOfDays: number;
    hotelRoomSlug: string;

}

export async function POST(req: Request, res: Response) {
    const { checkinDate, checkoutDate, adults, children, hotelRoomSlug, numberOfDays }: RequestData = await res.json()
    if (!checkinDate || !checkoutDate || !adults || !hotelRoomSlug || !numberOfDays) {
        return new NextResponse('Por favor, preencha todos os campos', { status: 400 })
    }

    const origin = req.headers.get('origin')

    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse('Você precisa estar logado para prosseguir', { status: 400 })
    }
    const userId = session.user.id
    const formattedCheckOutDate = checkoutDate.split("T")[0]
    const formattedCheckInDate = checkinDate.split("T")[0]

    try {
        const room = await getRoom(hotelRoomSlug)
        const discountPrice = room.price - (room.price / 100) * room.discount
        const totalPrice = discountPrice * numberOfDays

        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: 'brl',
                  product_data: {
                    name: room.name,
                    images: room.images.map(image => image.url),
                  },
                  unit_amount: parseInt((totalPrice * 100).toString()),
                },
              },
            ],
            payment_method_types: ['card'],
            success_url: `${origin}/users/${userId}`,
            metadata: {
              adults,
              checkinDate: formattedCheckInDate,
              checkoutDate: formattedCheckOutDate,
              children,
              hotelRoom: room._id,
              numberOfDays,
              user: userId,
              discount: room.discount,
              totalPrice
            }
          });
        return NextResponse.json(stripeSession,{
            status:200,
            statusText:'Sessão de pagamento criada'
        })
    } catch (error) {
        console.log("Erro ao gerar pagamento")
        return new NextResponse("Ocorreu um erro, tente novamente mais tarde", { status: 500 })
    }
}
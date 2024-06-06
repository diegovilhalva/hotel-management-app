import { Room } from "@/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries"


export async function getFeauredRoom() {
    const result = await sanityClient.fetch<Room>(queries.getFeaturedRoomQuery,
        {},
        {cache:"no-cache"})
        return result;
}

export async function getRooms() {
    const result = await sanityClient.fetch<Room[]>(queries.getRoomsQuery,{},{cache:"no-cache"})
    return result
}

export async function getRoom(slug:string){
    const result = await sanityClient.fetch<Room>(queries.getRoom,{slug},{cache:"no-cache"})
    return result

}
import { Room } from "@/app/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries"


export async function getFeauredRoom() {
    const result = await sanityClient.fetch<Room>(queries.getFeaturedRoomQuery,
        {},
        {cache:"no-cache"})
        return result;
}
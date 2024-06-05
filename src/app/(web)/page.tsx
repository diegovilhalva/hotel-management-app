

import FeaturedRoom from '@/components/FeaturedRoom/FeaturedRoom'
import Gallery from '@/components/Gallery/Gallery'
import HeroSection from '@/components/HeroSection/HeroSection'
import NewsLetter from '@/components/NewsLetter/NewsLetter'
import PageSearch from '@/components/PageSearch/PageSearch'
import { getFeauredRoom } from '@/libs/apis'
import React from 'react'

const Home = async () => {
  const featuredRoom = await getFeauredRoom() 
 
  return (
   <>
   <HeroSection/>
   <PageSearch/>
   <FeaturedRoom featuredRoom={featuredRoom}/>
   <Gallery/>
   <NewsLetter/>
   </>
  )
}

export default Home

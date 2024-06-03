'use client';

import { signUp } from "next-auth-sanity/client";
import { signIn,useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"

const defaultFormData ={
  name:'',
  email:'',
  password:''
}


const Auth = () => {
  const [formData,setFormData] = useState(defaultFormData)
  const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = event.target
    setFormData({...formData,[name]:value})
  }

  const {data:session} = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session) router.push('/')
  },[])

  const loginHandler = async () => {
    try {
      await signIn()
      router.push('/')
    } catch (error) {
      toast.error("Ocorreu um erro, tente novamente mais tarde")
    }
  }

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const user = await signUp(formData)
        if(user){
          toast.success("Usário criado com sucesso!")
        }
      } catch (error) {
      toast.error("Ocorreu um erro ")
      }finally{
        setFormData(defaultFormData)
      }
  }
  const inputStyles = "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none"
  return (
    <section className="container mx-auto">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
            <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">Crie sua conta</h1>
                <p>Ou</p>
                <span className="inline-flex items-center">
                    <AiFillGithub onClick={loginHandler} className="mr-3 text-4xl cursor-pointer text-black dark:text-white"/> | 
                    <FcGoogle onClick={loginHandler} className="ml-3 text-4xl cursor-pointer"/>
                </span>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input type="text" name="name" id="name" placeholder="Digite seu nome" className={inputStyles} value={formData.name} onChange={handleInputChange} />
              <input type="email" name="email" id="email" placeholder="email@exemplo.com" required className={inputStyles} value={formData.email} 
              onChange={handleInputChange} />
              <input type="password" name="password" id="password" 
              placeholder="Digite sua senha" className={inputStyles} required minLength={6} 
              value={formData.password} onChange={handleInputChange} />
              <button type="submit" className="w-full bg-tertiary-dark outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Criar conta</button>
            </form>
           <span className="text-blue-700">Já possui uma conta?</span> <button className="text-blue-700 underline">Fazer login</button>
        </div>
    </section>
  )
}

export default Auth
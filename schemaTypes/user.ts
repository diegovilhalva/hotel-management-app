import { defineField } from "sanity"

const  user = {
    name:"user",
    title:"user",
    type:"document",
    fields:[
        defineField({
            name:"isAdmin",
            title:"Is admin",
            type:"boolean",
            description:"Check if the user is admin",
            initialValue:false,
            validation:(Rule) => Rule.required(),
            //readOnly:true,
            //hidden:true
        }),
        defineField({
            name:"name",
            title:"Nome",
            type:"string",
            description:"Nome do usuário",
            readOnly:true,
            validation:(Rule) => Rule.required(),
        }),
        defineField({
            name:"image",
            title:"Imagem de perfil",
            type:"url",
        }),
        defineField({
            name:"password",
            type:"string",
            hidden:true,
            validation:(Rule) => Rule.required(),
        }),
        defineField({
            name:"about",
            title:'Sobre',
            type:"text",
            description:"Uma breve descrição do usuário"
        })
    ]
}

export default user
import { defineField } from "sanity"


const roomTypes = [
    { title: 'Básico', value: 'basic' },
    { title: 'Luxo', value: 'luxury' },
    { title: 'Suíte', value: 'suite' },
  ];
const hotelRoom = {
    name: "hotelRoom",
    title: "Hotel room",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Nome",
            type: "string",
            validation: Rule => Rule.required().max(50).error("Máximo de 50 caracteres")
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "name"
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "description",
            title: "Descrição",
            type: "text",
            validation: Rule => Rule.required().min(100).error("Máximo de 100 caracteres"),
        }),
        defineField({
            name: "price",
            title: "Preço",
            type: "number",
            validation: Rule => Rule.required().min(100).error("Máximo de 100 caracteres")
        }),
        defineField({
            name: "discount",
            title: "Desconto",
            type: "number",
            initialValue: 0,
            validation: Rule => Rule.min(0),
        }),
        defineField({
            name: "images",
            title: "Imagens",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "url", type: "url", title: "URL" },
                        { name: "file", type: "file", title: "Arquivo" },
                    ]
                },

            ],
            validation:Rule => Rule.required().min(3).error("Mínimo de 3 imagens") 
        }),
        defineField({
            name:"coverImage",
            title:"Imagem da Capa",
            type:"object",
            fields:[
            {name:"url",type:"url",title:"URL"},
            {name:"file",type:"file",title:"Arquivo"}
            ],
            validation:Rule => Rule.required().error("imagem da capa é obrigátoria")
        }),
        defineField({
            name:"type",
            title:"Tipo de quarto",
            type:"string",
            options:{
                list:roomTypes
            },
            validation:Rule => Rule.required(),
            initialValue:"basic"
        }),
        defineField({
            name:"specialNote",
            title:"Anotações",
            type:"text",
            validation:Rule => Rule.required(),
            initialValue:"O horário de check-in é às 12:00 PM e o horário de checkout é às 11:59 AM. Caso você deixe algum item para trás, por favor, entre em contato com a recepcionista."
        }),
        defineField({
            name:"dimension",
            title:"Tamanho",
            type:"string"
        }),
        defineField({
            name:"numberOfBeds",
            title:"Número de leitos",
            type:"number",
            validation:Rule => Rule.min(1),
            initialValue:1
        }),
        defineField({
            name:"offeredAmenit",
            title:"Comodidades",
            type:"array",
            of:[
                {
                    type:"object",
                    fields:[
                        {name:"icon",title:"Ícone",type:"string"},
                        {name:"amenity",title:"Comodidade",type:"string"}
                    ]
                }
            ]
        }),
        defineField({
            name: 'isBooked',
            title: 'Reservado',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Destaque',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'reviews',
            title: 'Avaliações',
            type: 'array',
            of: [{ type: 'review' }],
          }),
    ]
}

export default hotelRoom
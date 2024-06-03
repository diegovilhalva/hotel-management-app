import { defineField } from "sanity"

const review = {
    name: "review",
    title: "Review",
    type: "document",
    fields: [
        defineField({
            name: "user",
            title: "Usuário",
            type: "reference",
            to: [{ type: "user" }]
        }),
        defineField({
            name: "hotelRoom",
            title: "Quarto",
            type: "reference",
            to: [{ type: "hotelRoom" }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'text',
            title: 'Avaliação',
            type: 'text',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'userRating',
            title: 'Nota',
            type: 'number',
            validation: Rule =>
              Rule.required().min(1).max(5).error('A nota deve ser entre 1 e 5'),
          }),
    ]
}

export default review
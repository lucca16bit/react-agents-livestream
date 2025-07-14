import z from 'zod/v4';

const createQuestionSchema = z.object({
    question: z
        .string()
        .min(1, 'Pergunta é obrigatória')
        .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
        .max(500, 'Pergunta deve ter menos de 500 caracteres'),
});

export const questionSchema = {
    createQuestionSchema,
};

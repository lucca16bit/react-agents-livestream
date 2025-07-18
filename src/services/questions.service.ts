import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestionRequest } from '@/types/create-question-request.type';
import type { CreateQuestionResponse } from '@/types/create-question-response.type';
import type { GetQuestionsResponse } from '@/types/question-response.type';

const API_URL = 'http://localhost:3000/api/rooms/';

export function useGetQuestion(roomId: string) {
    return useQuery({
        queryKey: ['get-questions', roomId],
        queryFn: async () => {
            const response = await fetch(`${API_URL + roomId}/questions`);
            const json = await response.json();

            return json.data as GetQuestionsResponse;
        },
    });
}

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateQuestionRequest) => {
            const response = await fetch(`${API_URL + roomId}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result: CreateQuestionResponse = await response.json();

            return result;
        },
        // executa no momento em que for chamada para API
        onMutate({ question }) {
            const questions = queryClient.getQueryData<GetQuestionsResponse>([
                'get-questions',
                roomId,
            ]);

            const questionsArray = questions ?? [];

            const newQuestion = {
                id: crypto.randomUUID(),
                question,
                answer: null,
                createdAt: new Date().toISOString(),
                isGeneratingAnswer: true,
            };

            queryClient.setQueryData<GetQuestionsResponse>(
                ['get-questions', roomId],
                [newQuestion, ...questionsArray]
            );

            return { newQuestion, questions };
        },
        onSuccess(data, _variables, context) {
            queryClient.setQueryData<GetQuestionsResponse>(
                ['get-questions', roomId],
                (questions) => {
                    if (!questions) {
                        return questions;
                    }

                    if (!context.newQuestion) {
                        return questions;
                    }

                    return questions.map((question) => {
                        if (question.id === context.newQuestion.id) {
                            return {
                                ...context.newQuestion,
                                id: data.questionId,
                                answer: data.answer,
                            };
                        }

                        return question;
                    });
                }
            );
        },
        onError(_error, _variables, context) {
            if (context?.questions) {
                queryClient.setQueryData<GetQuestionsResponse>(
                    ['get-questions', roomId],
                    context.questions
                );
            }
        },
    });
}

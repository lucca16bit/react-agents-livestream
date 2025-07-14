import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useCreateQuestion } from '@/services/questions.service';
import { questionSchema } from '@/validations/question.schema';

type CreateQuestionFormData = z.infer<
    typeof questionSchema.createQuestionSchema
>;

interface QuestionFormProps {
    roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
    const { mutateAsync: createQuestion } = useCreateQuestion(roomId);

    const form = useForm<CreateQuestionFormData>({
        resolver: zodResolver(questionSchema.createQuestionSchema),
        defaultValues: {
            question: '',
        },
    });

    async function handleCreateQuestion(data: CreateQuestionFormData) {
        await createQuestion({ ...data, roomId });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fazer uma Pergunta</CardTitle>
                <CardDescription>
                    Digite sua pergunta abaixo para receber uma resposta gerada por IA
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(handleCreateQuestion)}
                    >
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sua Pergunta</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[100px]"
                                            placeholder="O que você gostaria de saber?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Enviar pergunta</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

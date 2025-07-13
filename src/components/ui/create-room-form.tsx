import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useCreateRooms } from '@/services/rooms.service';
import { roomSchema } from '@/validations/room.schema';
import { Button } from './button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';
import { Input } from './input';
import { Textarea } from './textarea';

type CreateRoomFormData = z.infer<typeof roomSchema.createRoomSchema>;

export function CreateRoomForm() {
    const { mutateAsync: createRoom } = useCreateRooms();

    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(roomSchema.createRoomSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    async function handleCreateRoom({ name, description }: CreateRoomFormData) {
        await createRoom({ name, description });
        createRoomForm.reset();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar sala</CardTitle>
                <CardDescription>
                    Crie uma nova sala para começar a fazer perguntas e receber respostas
                    da IA
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
                    >
                        <FormField
                            control={createRoomForm.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Nome da sala</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Digite o nome da sala..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={createRoomForm.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <Button className="w-full" type="submit">
                            Criar sala
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

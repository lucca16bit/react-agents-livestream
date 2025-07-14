import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetRooms } from '@/services/rooms.service';
import { dayjs } from '@/utils/format-date.utils';
import { Badge } from './badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './card';

export function RoomList() {
    const { data, isLoading } = useGetRooms();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Salas recentes</CardTitle>
                <CardDescription>
                    Acesso rápido para as salas criadas recentemente
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {isLoading && (
                    <p className="text-muted-foreground text-sm">Carregando salas...</p>
                )}

                {data?.map((room) => {
                    return (
                        <Link
                            className="flex items-center justify-between rounded-lg border p-5 hover:bg-accent/50"
                            key={room.id}
                            to={`/room/${room.id}`}
                        >
                            <div className="flex flex-1 flex-col gap-1">
                                <h3 className="font-medium">{room.name}</h3>

                                <div className="flex items-center gap-2">
                                    <Badge className="text-xs" variant={'secondary'}>
                                        {dayjs(room.createdAt).toNow()}
                                    </Badge>
                                    <Badge className="text-xs" variant={'secondary'}>
                                        {room.questions} Perguntas
                                    </Badge>
                                </div>
                            </div>

                            <span className="flex items-center gap-1 text-sm">
                                Entrar
                                <ArrowRight className="size-3" />
                            </span>
                        </Link>
                    );
                })}
            </CardContent>
        </Card>
    );
}

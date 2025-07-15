/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const isRecordingSupported =
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof window.MediaRecorder === 'function';

type RoomParams = {
    roomId: string;
};

const API_URL = 'http://localhost:3000/api/rooms/';

export function RecordRoom() {
    const params = useParams<RoomParams>();
    const [isRecording, setIsRecording] = useState(false);
    const recorder = useRef<MediaRecorder | null>(null);

    function stopRecording() {
        setIsRecording(false);

        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop();
        }
    }

    async function uploadAudio(audio: Blob) {
        const formData = new FormData();

        formData.append('file', audio, 'audio.webm');

        const response = await fetch(`${API_URL + params.roomId}/audio`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        console.log(result);
    }

    async function startRecording() {
        if (!isRecordingSupported) {
            alert('O seu navegador não suporta gravação');
            return;
        }

        setIsRecording(true);

        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44_100,
            },
        });

        recorder.current = new MediaRecorder(audio, {
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64_000,
        });

        recorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                uploadAudio(event.data);
            }
        };

        recorder.current.onstart = () => {
            console.log('gravação iniciada');
        };

        recorder.current.onstop = () => {
            console.log('gravação encerrada');
        };

        recorder.current.start();
    }

    if (!params.roomId) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3">
            {isRecording ? (
                <Button className="cursor-pointer" onClick={stopRecording}>
                    Parar gravação
                </Button>
            ) : (
                <Button className="cursor-pointer" onClick={startRecording}>
                    Gravar áudio
                </Button>
            )}
            {isRecording ? <p>Granvando...</p> : <p>Pausado</p>}
        </div>
    );
}

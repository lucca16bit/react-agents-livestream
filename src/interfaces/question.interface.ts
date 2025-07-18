export interface Question {
    id: string;
    question: string;
    answer?: string | null;
    createdAt: string;
    isGeneratingAnswer?: boolean;
}

export interface Link {
    id: number;
    token: string;
    document_name: string;
    created_at: number;
    redeemed_at: number | null;
}

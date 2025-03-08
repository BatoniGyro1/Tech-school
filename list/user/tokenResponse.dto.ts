import { Expose } from "class-transformer";

export class TokenResponseDto {
    @Expose()
    id: number;

    @Expose()
    access_token: string;
}
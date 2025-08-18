import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto{
    @ApiProperty({
            example:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY25kbmpzZ2giLCJ1c2VyX3B3IjoiMTIzNCIsInVzZXJfbmFtZSI6IuybkO2YuCIsImlhdCI6MTc1NTUwNjk4OCwiZXhwIjoxNzU1NTA3Mjg4fQ.UVQfEck_4wYbJayvkm-NCJPOWPwSdUgiKNFxGRKtCUU',
            description: 'accesstoken입니다.',
        })
    accesstoken: string;
   
    @ApiProperty({
            example:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY25kbmpzZ2giLCJpYXQiOjE3NTU1MDY5ODgsImV4cCI6MTc1NTU0Mjk4OH0.bllXAhI2K4qSvhoByIjQ_9X3FXqg4GtNVlsTR5FZlyE',
            description: 'refreshtoken입니다.',
        })
    refreshtoken: string;
}
// import { Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
// import { PaymentsService } from "src/services/payments.service";
// import { Request, Response } from "express";
// import { NoAuth } from "src/decorators/auth.decorator";

// @Controller('payments')
// export class PaymentsController {
//     constructor(private paymentsService: PaymentsService) {}

//     @NoAuth()
//     @Post('create-checkout-session')
//     async createCheckoutSession(@Req() request: Request, @Res() response: Response) {
//         const checkoutSession = await this.paymentsService.createCheckoutSession(request);
//         response.redirect(303, checkoutSession.url);
//     }

//     @NoAuth()
//     @Get('checkout')
//     async checkout(@Query('success') success: string, @Query('canceled') canceled: string) {
//         if (success == "true") return "success";
//         if (canceled == "true") return "canceled";
//     }
// }


import { Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import { PaymentsService } from "src/services/payments.service";
import { Request, Response } from "express";
import { NoAuth } from "src/decorators/auth.decorator";

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {}

    @NoAuth()
    @Post('create-checkout-session')
    async createCheckoutSession(@Req() request: Request, @Res() response: Response) {
        const checkoutSession = await this.paymentsService.createCheckoutSession(request);
        response.redirect(303, checkoutSession.url);
    }

    @NoAuth()
    @Get('checkout')
    async checkout(@Query('success') success: string, @Query('canceled') canceled: string) {
        if (success === "true") return "success";
        if (canceled === "true") return "canceled";
    }
}
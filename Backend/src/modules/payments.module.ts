import { Module } from "@nestjs/common";
import { PaymentsController } from "src/controllers/payments.controller";
import { PaymentsService } from "src/services/payments.service";

@Module({
    providers: [PaymentsService],
    controllers: [PaymentsController]
  })
export class PaymentsModule {}
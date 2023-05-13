import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AcceptanceTokenResponse, PaymentSourceResponse } from './payment.dto';

@Injectable()
export class PaymentService {
  private httpService: HttpService;
  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getAcceptanceToken(): Promise<string> {
    const url = `${process.env.PAYMENT_BASE_URL}/v1/merchants/${process.env.PAYMENT_PUBLIC_KEY}`;

    const response = await firstValueFrom(
      this.httpService.get<AcceptanceTokenResponse>(url),
    );

    return response.data.data.presigned_acceptance.acceptance_token;
  }

  async createPaymentSource(
    tokenizedCard: string,
    riderEmail: string,
    acceptanceToken: string,
  ): Promise<number> {
    const data = {
      type: 'CARD',
      token: tokenizedCard,
      customer_email: riderEmail,
      acceptance_token: acceptanceToken,
    };

    const url = `${process.env.PAYMENT_BASE_URL}/v1/payment_sources`;

    const response = await firstValueFrom(
      this.httpService.post<PaymentSourceResponse>(url, data, {
        headers: {
          Authorization: `Bearer ${process.env.PAYMENT_PRIVATE_KEY}`,
        },
      }),
    );

    return response.data.data.id;
  }
}

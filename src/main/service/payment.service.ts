import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  AcceptanceTokenResponse,
  CreateTransactionResponse,
  PaymentSourceResponse,
} from './payment.dto';

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

  async createTransaction(
    amount,
    riderEmail,
    reference,
    paymentSourceId,
  ): Promise<CreateTransactionResponse> {
    const data = {
      amount_in_cents: amount * 100, // Monto current centavos
      currency: 'COP', // Moneda
      customer_email: riderEmail, // Email del usuario
      payment_method: {
        installments: 1, // Número de cuotas si la fuente de pago representa una tarjeta de lo contrario el campo payment_method puede ser ignorado.
      },
      reference: reference, // Referencia única de pago
      payment_source_id: paymentSourceId, // ID de la fuente de pago
    };

    const url = `${process.env.PAYMENT_BASE_URL}/v1/transactions`;

    const response = await firstValueFrom(
      this.httpService.post<CreateTransactionResponse>(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PAYMENT_PRIVATE_KEY}`,
        },
      }),
    );

    return response.data;
  }
}

export type AcceptanceTokenResponse = {
  data: {
    id: number;
    name: string;
    presigned_acceptance: {
      acceptance_token: string;
    };
  };
};

export type PaymentSourceResponse = {
  data: {
    id: number;
  };
};

export type CreateTransactionResponse = {
  data: {
    id: string;
    status: string;
  };
};

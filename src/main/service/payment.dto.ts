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

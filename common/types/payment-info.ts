export type PaymentInfo = {
  id: string;
  rows: [
    {
      name?: string;
      link?: string;
      account?: string;
      cost?: string;
    }
  ];
};

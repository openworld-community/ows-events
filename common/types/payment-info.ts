export type PaymentInfo =
  | {
      type: "table";
      id: string;
      rows: [
        {
          name?: string;
          link?: string;
          account?: string;
          price?: string;
        }
      ];
    }
  | {
      type: "markdown";
      id: string;
      source: string;
    };

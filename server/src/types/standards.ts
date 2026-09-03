/** BIS standards domain types. */

export type BisStandard = {
  standardNumber: string;
  title: string;
  category?: string;
  year?: number;
  description?: string;
};

export type Clause = {
  clauseNumber: string;
  text: string;
  standardNumber: string;
  title?: string;
};

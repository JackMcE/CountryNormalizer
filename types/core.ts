export interface AllCountryFields {
  common_reference: string;
  english_clean: string;
  formal_order: string;
  alpha_2: string;
  alpha_3: string;
  num_code: number;
  demonym_male: string;
  demonym_female: string;
  gendered_demonym: boolean;
  tld: string;
  flag_emoji: string;
  calling_code: string[];
  continent: string;
}

export type ContactCountryFields = Pick<
  AllCountryFields,
  "tld" | "flag_emoji" | "calling_code"
>;

export type UniqueCountryFields = Pick<
  AllCountryFields,
  "english_clean" | "formal_order" | "alpha_2" | "alpha_3" | "num_code"
>;

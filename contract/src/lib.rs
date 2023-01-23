use near_sdk::collections::UnorderedMap;
use near_sdk::json_types::U128;
use near_sdk::Promise;
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env, near_bindgen,
    serde::{Deserialize, Serialize},
    AccountId, PanicOnDefault,
};

pub type QuoteId = String; //custom type

#[derive(BorshSerialize)]
pub enum StorageKey {
    QuoteId,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonQuoteData {
    pub id: QuoteId,
    pub text: String,
    pub author: AccountId,
    pub tip: String,
    pub tip_count: u64,
    pub created_at: u64,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct QuoteData {
    pub id: QuoteId,
    pub text: String,
    pub author: AccountId,
    pub tip: String,
    pub tip_count: u64,
    pub created_at: u64,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Quote {
    owner_id: AccountId,
    quotes: UnorderedMap<QuoteId, QuoteData>,
}

#[near_bindgen]
impl Quote {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            quotes: UnorderedMap::new(StorageKey::QuoteId.try_to_vec().unwrap()),
        }
    }

    pub fn create_quote(&mut self, author: AccountId, text: String) -> JsonQuoteData {
        let quote_id = format!("QUO-{}", (&env::block_timestamp()));

        self.quotes.insert(
            &quote_id,
            &QuoteData {
                id: quote_id.clone(),
                text: text.clone(),
                author: author.clone(),
                tip: "1000000000000000000000000".to_string(),
                tip_count: 0,
                created_at: env::block_timestamp(),
            },
        );

        JsonQuoteData {
            id: quote_id,
            text,
            author,
            tip: "1000000000000000000000000".to_string(),
            tip_count: 0,
            created_at: env::block_timestamp(),
        }
    }

    pub fn fetch_quotes(
        &self,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<JsonQuoteData> {
        let start_index: u128 = from_index.map(From::from).unwrap_or_default();
        assert!(
            (self.quotes.len() as u128) > start_index,
            "Error: Out of bounds, start your search with a smaller from_index."
        );

        let limit = limit.map(|v| v as usize).unwrap_or(usize::MAX);
        assert_ne!(limit, 0, "Provide limit higher than 0.");

        self.quotes
            .iter()
            .skip(start_index as usize)
            .take(limit)
            .map(|(id, quote)| JsonQuoteData {
                id: id.to_string(),
                text: quote.text,
                author: quote.author,
                tip: quote.tip,
                tip_count: quote.tip_count,
                created_at: quote.created_at,
            })
            .collect()
    }

  
    pub fn delete_quote(&mut self, id: QuoteId) -> String {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Only owner can delete this quote",
        );

        let quote = format!("{} was deleted successfully", id.clone());
        self.quotes.remove(&id);
        quote
    }

    pub fn total_quotes(&self) -> U128 {
        U128(self.quotes.len() as u128)
    }

    #[payable]
    pub fn tip_author(&mut self, id: QuoteId) -> String {
        match self.quotes.get(&id) {
            Some(ref mut quote) => {
                let tip = quote.tip.parse().unwrap();

                assert_eq!(
                    env::attached_deposit(),
                    tip,
                    "attached deposit should be equal to the price of the product"
                );

                let owner = &quote.author.as_str();

                Promise::new(owner.parse().unwrap()).transfer(tip);


                self.quotes.insert(
                    &quote.id,
                    &QuoteData {
                        id: quote.id.clone(),
                        text: quote.text.clone(),
                        author: quote.author.clone(),
                        tip: quote.tip.clone(),
                        tip_count: quote.tip_count,
                        created_at: quote.created_at,
                    },
                );
                self.tip_count(id.clone());

                format!("Tip sent")
            }
            _ => {
                env::panic_str("product not found");
            }
        }
    }

    pub fn tip_count(&mut self, id: QuoteId) {
        let mut get_quote = self.quotes.get(&id).expect("Not Found");
        get_quote.tip_count += 1;

        self.quotes.insert(
            &get_quote.id,
            &QuoteData {
                id: get_quote.id.clone(),
                text: get_quote.text.clone(),
                author: get_quote.author.clone(),
                tip: get_quote.tip.clone(),
                tip_count: get_quote.tip_count,
                created_at: get_quote.created_at,
            },
        );

    }
}

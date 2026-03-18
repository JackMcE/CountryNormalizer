# 🌎 Country Data Lookup And Normalizer 🌍

[![CI](https://github.com/JackMcE/CountryNormalizer/actions/workflows/ci.yml/badge.svg)](https://github.com/JackMcE/CountryNormalizer/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/countrynormalizer.svg)](https://www.npmjs.com/package/countrynormalizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Coverage](https://codecov.io/gh/JackMcE/CountryNormalizer/branch/main/graph/badge.svg)](https://codecov.io/gh/JackMcE/CountryNormalizer)
[![npm downloads](https://img.shields.io/npm/dm/countrynormalizer.svg)](https://www.npmjs.com/package/countrynormalizer)

A simple library for consolidation and reverse lookup of common ISO country data fields and calling codes all in one place.

## Installation

```bash
npm install countrynormalizer
```

```bash
bun add countrynormalizer
```

Developers routinely need to mix and match pieces of country data across an application.

Some common examples are:

- Retrieve a country's full name based on an ISO Alpha 2 or Alpha 3 code.
- Turn a user-entered country name back into an ISO Alpha 2 or 3 code for API standardization.
- Load a country's flag/flag emoji based on a user input or phone number input.
- Standardize the name of a country or input from many different references to a country.
- List all countries on a continent for location selection.
- Find countries that correspond to a particular phone number's calling code.

There are lots of good libraries out there that handle one of these functions at a time. Turning ISO 3166-1 alpha-2 into full names, or phone number into country flags, and so on and so forth.

It is not uncommon though for application or business use cases to require moving between many of these data points in one application. Yet it can be fairly hard to find all of this data consolidated into a single place.

This library aims to solve a lot of that by consolidating these common country lookups into one place.

## Available Lookups:

### Find Country By Unique:

The `findCountryByUnique(needle: string | number): AllCountryFields | null` can be used to lookup all data for a country based on a single guaranteed unique field. If no country matches the input the function will return `null`.

The guaranteed unique fields are:

- ISO 3166-1 number: The unique ISO 3166-1 number values where there are no duplicate values across all countries.
- ISO 3166-1 alpha-2: Two letter guaranteed unique country code values.
- ISO 3166-1 alpha-3: Three letter guaranteed unique country code values.
- `english_clean`: English country names from the ISO 3166 standard as listed on Wikipedia.
- `formal_order`: The naturally spoken order of a country's formal name from the ISO 3166 standard. For instance, the `english_clean` for the Netherlands is `Netherlands, Kingdom of the`, while the `formal_order` is `Kingdom of the Netherlands` — the way the country would be referenced in formal international or political conversation.
- `common_reference`: Maps country names to how they would be referred to in normal casual conversation. So `Kingdom of the Netherlands` is just `Netherlands`. The `Holy See` is `Vatican City`. You can probably use common sense to arrive at most of these.
- `flag_emoji`: The Unicode standard dictates that all ISO 3166 countries shall have an emoji flag. As such you can search the emoji of a flag as input and retrieve all data for that country.
- `tld (top-level domain)` - Searches for the countries top-level domain match.

The returned country structure will match the `AllCountryFields` type and look like this...

```
{
      common_reference: "United States",
      english_clean: "United States of America",
      formal_order: "United States of America",
      alpha_2: "US",
      alpha_3: "USA",
      num_code: 840,
      demonym_male: "American",
      demonym_female: "American",
      gendered_demonym: true,
      tld: ".us",
      flag_emoji: "🇺🇸",
      calling_code: ["1"],
      continent: "North America",
    }
```

### Find All Matching Countries:

You can use `findAllMatchedCountries(needle: string | number): AllCountryFields[]` to get all countries that match a particular data point.

Certain pieces of country data are not unique but still routinely need to be searched for.

A common example of this is calling codes. Most of North America uses the `+1` calling code block. Using a `needle` value of `1` or `+1` will return an array of country data like...

```
{
        "common_reference": "United States",
        "english_clean": "United States of America",
        "formal_order": "United States of America",
        "alpha_2": "US",
        "alpha_3": "USA",
        "num_code": 840,
        "demonym_male": "American",
        "demonym_female": "American",
        "gendered_demonym": true,
        "tld": ".us",
        "flag_emoji": "🇺🇸",
        "calling_code": [
            "1"
        ],
        "continent": "North America"
    },
{
        "common_reference": "US Territories",
        "english_clean": "United States Minor Outlying Islands",
        "formal_order": "United States Minor Outlying Islands",
        "alpha_2": "UM",
        "alpha_3": "UMI",
        "num_code": 581,
        "demonym_male": "United States Minor Outlying Islander",
        "demonym_female": "United States Minor Outlying Islander",
        "gendered_demonym": true,
        "tld": ".um",
        "flag_emoji": "🇺🇲",
        "calling_code": [
            "1"
        ],
        "continent": "Oceania"
    },
{
        "common_reference": "Canada",
        "english_clean": "Canada",
        "formal_order": "Canada",
        "alpha_2": "CA",
        "alpha_3": "CAN",
        "num_code": 124,
        "demonym_male": "Canadian",
        "demonym_female": "Canadian",
        "gendered_demonym": true,
        "tld": ".ca",
        "flag_emoji": "🇨🇦",
        "calling_code": [
            "1"
        ],
        "continent": "North America"
    },

```

Another use case for this could be if your app has a region-based country selection and you needed all countries in Asia. You could perform a `findAllMatchedCountries('asia')` and get all countries in Asia.

This function still supports singular lookup. Entering something like `findAllMatchedCountries('GB')` will return a single item array like...

```
[{
        "common_reference": "United Kingdom",
        "english_clean": "United Kingdom of Great Britain and Northern Ireland",
        "formal_order": "United Kingdom of Great Britain and Northern Ireland",
        "alpha_2": "GB",
        "alpha_3": "GBR",
        "num_code": 826,
        "demonym_male": "British",
        "demonym_female": "British",
        "gendered_demonym": true,
        "tld": ".gb",
        "flag_emoji": "🇬🇧",
        "calling_code": [
            "44"
        ],
        "continent": "Europe"
    },]
```

Entering a text value into this function that yields no results will return an empty (`[]`) array.

### Get Countries Contact Fields:

It is common for applications to want to get the contact fields such as calling code blocks for the country, the flag of the country for visual identification, or top-level domains.

In order to keep a smaller object available to work with and for tree-shaking consumer facing apps you can call `getContactFieldsByAlpha2(alpha2: string): ContactCountryFields | null` in order to get a response object of only the countries contact fields.

```
{
   "tld": ".gn",
   "flag_emoji": "🇬🇳",
   "calling_code": [
      "224"
   ]
}
```

If the input does not match a valid ISO Alpha 2 value function returns `null`. The inputs ARE NOT keyed and open ended. Since this kind of data lookup is often times done based on open ended user input it is easier to simply check any string coming in and handle it vs making applications have to typecheck the input lookup.

### Get All Countries For Continent:

In cases where you need to make a location selection you may want to query all countries located on a continent.

You can use `getCountriesByContinent(searchContinent: ContinentNames): ContinentTrimmedFields[]` function. This function requires a specifically matched enum input of continent names. It can be imported via `ContinentNames`.

This function returns a trimmed down set of country data for each country on the continent. You'll receive all the guaranteed unique identifier and display fields, with globally standardized contact data trimmed away. For example the response for Antarctica would look like this...

```
[
        {
            "english_clean": "Antarctica",
            "formal_order": "Antarctica",
            "alpha_2": "AQ",
            "alpha_3": "ATA",
            "num_code": 10,
            "tld": ".aq",
            "flag_emoji": "🇦🇶"
        },
        {
            "english_clean": "Bouvet Island",
            "formal_order": "Bouvet Island",
            "alpha_2": "BV",
            "alpha_3": "BVT",
            "num_code": 74,
            "tld": ".bv",
            "flag_emoji": "🇧🇻"
        },
        {
            "english_clean": "Heard Island and McDonald Islands",
            "formal_order": "Heard Island and McDonald Islands",
            "alpha_2": "HM",
            "alpha_3": "HMD",
            "num_code": 334,
            "tld": ".hm",
            "flag_emoji": "🇭🇲"
        },
        {
            "english_clean": "South Georgia and the South Sandwich Islands",
            "formal_order": "South Georgia and the South Sandwich Islands",
            "alpha_2": "GS",
            "alpha_3": "SGS",
            "num_code": 239,
            "tld": ".gs",
            "flag_emoji": "🇬🇸"
        },
        {
            "english_clean": "Svalbard and Jan Mayen",
            "formal_order": "Svalbard and Jan Mayen",
            "alpha_2": "SJ",
            "alpha_3": "SJM",
            "num_code": 744,
            "tld": ".sj",
            "flag_emoji": "🇸🇯"
        }
    ]
```

If you need absolutely all information about every country on a continent use the `findAllMatchedCountries()` function with a continent entered.

### List All Countries:

You can call `getAllCountries()` to return the complete countries data set. The response is properly typed so it should be decently easy to work with.

This is a massive array of objects for every country on Earth contained in the ISO 3166 list.

This may be helpful for understanding the data shapes, visualizing all the data, or shaping information in ways the package functions/APIs do not support natively.

## Data Sources:

This data is compiled from a wide array of sources. To give transparency to this I want to document the primary source or reason for each field.

- common_reference: A field for how people might commonly refer to a country in conversation or normal parlance shorthand. All special characters are removed except dashes, commas, and parentheses. This makes searching by standard keyboard entry easier. For example, `Türkiye` is commonly typed as `Turkey`. This field helps flatten and make searching for these countries easier. The naming conventions here are purely an executive decision by me, the maintainer. All values are unique.
- english_clean: This comes off of the "country name using title case" column on the wikipedia Alpha 2 documentation for ISO 3166: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
- formal_order: On Wikipedia and other sources for easy Alpabetization they order countries by common names. So "Netherlands, Kingdom of the", this just puts it in order as "Kingdom of the Netherlands."
- alpha_2: ISO 3166 Alpha 2 values as listed on wikipedia: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
- alpha_3: Taken from Wikipedia ISO 3166 master table: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
- num_code: Taken from Wikipedia ISO 3166 master table: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
- demonym_male: ChatGTP deep research compiled CSV dataset asking it to align ISO Alpha 3 codes to demonym by country for both male and female.
- demonym_female: ChatGTP deep research compiled CSV dataset asking it to align ISO Alpha 3 codes to demonym by country for both male and female.
- gendered_demonym: Manual alignment in Google Sheet by me comparing `demonym_male` and `demonym_male` for string differences and setting a boolean.
- tld: Taken from Wikipedia ISO 3166 master table: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
- flag_emoji: Used table available on Flagepedia and then cleaned up the data for easy usage in CSVs and JSON objects: https://flagpedia.net/emoji
- calling_code: ChatGPT compiled deep research task. Instructed to rely primarily on these data sources to make data easily worked with in a CSV and as JSON objects.
- - https://en.wikipedia.org/wiki/Trunk_prefix
- - https://en.wikipedia.org/wiki/List_of_telephone_country_codes
- - https://www.countrycode.org/
- continent: ChatGPT deep research compiled list asking to align all ISO Alpha 3 country codes to their continent.

## To-Do List:

This package was started as part of language classification and news analytics projects I'm working on in my personal time.

I've enjoyed building it out but wanted to publish something for starters so I don't let this languish on my personal computer for too long.

Over the next few weeks (hopefully) I plan to build out the following...

- ~~tld search support should be added to unique lookups since these are unique values.~~
- Optimize the search order of data when performing lookups.
- Clean up some of the `common_reference` values. A lot of these are executive decisions I quickly made and could be better researched or refined.
- ~~Provide better documentation on the data sources for each of these fields to help assure people of data validity and no collisions of unique data points.~~
- Flesh out more complete unit testing. I have a few running right now checking ISO number values but all data values should be validated.
- Add size optimized lookups for common operations. Currently the `complete.json` object used for country data is rather large and bloats this library. I want to make smaller, tree-shakable functions to handle only certain data queries on the fly.
- Set up a small website to visualize all this data in an accessible table for using alongside this library. Right now a lot of it is just compiled in a haphazard Google Doc where I did my initial organizing before translating a CSV into a JSON file.

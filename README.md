# 🌎 Country Data Lookup And Normalizer 🌍

A simple library for consolidation and reverse lookup of common ISO country data fields and calling codes all in one place.

It is routinely common for developers to need to mix and match pieces of country data across an application.

Some common examples are:

* Retrieve a countries full name based on an ISO Alpha 2 or Alpha 3 code and turn it into the full name.
* Turn a user entered full country name back into an ISO ALpha 2 or 3 code for API standardization.
* Load a countries flag/flag emoji based on a user input or phone number input.
* Standardize the name of a country or input from many different references to a country.
* List all countries on a continent for location selection.
* Find countries that correspond to a particular phone numbers calling code.

There are lots of good libraries out there that handle one of these functions at a time. Turning ISO 3166-1 alpha-2 into full names, or phone number into country flags, and so on and so forth.

It is not uncommon through for application or business use cases that you need to actually move between many of these datapoints in one application. Yet it can be fairly hard to find all of this data consolidated into a single place.

This library aims to solve a lot of that by consolidating these common country lookups into one place.

## Available Lookups:

### Find Country By Unique:

The `findCountryByUnique(needle: string | number): AllCountryFields | null` can be used to lookup all data for a country based on a single guaranteed unique field. If no country matches the input the function will return `null`.

The guaranteed unique fields are:

* ISO 3166-1 number: The unique ISO 3166-1 number values where there are no duplicate values across all countries.
* ISO 3166-1 alpha-2: Two letter guaranteed unique country code values.
* ISO 3166-1 alpha-3: Three letter guaranteed unique country code values.
* `english_clean`: English country names on the ISO 3166 standard as listed on Wikipedia.
* `formal_order`: The common parlance order of a country name based on the ISO 3166 standard without primary naming feature first. For instance the `english_clean` for the Netherlands is `Netherlands, Kingdom of the`. The formal order is how the country would be mentioned in international or political conversation formally. E.g. `Kingdom of the Netherlands`.
* `common_reference`: Maps names of countries onto how they would be refered to in normal casual conversation between people or natives. So `Kingdom of the Netherlands` is just `Netherlands`. The `Holy See` is `Vatican City.` You can probably use common sense to arrive at most of these.
* flag_emoji: The Unicode standard dictates that all ISO 3166 countries shall have an emoji flag. As such you can search the emoji of a flag as input and retrieve all data for that country.

The returned country structure will match the `AllCountryFields` type and look like this...

```
{
      common_reference: "United States of America",
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

Certain pieces of country data are not unique but still routinely need searched for.

A common example of this is calling codes. Most of North America uses the `+1` calling code block. Using a `needle` value of `1` or `+1` will return an array of country data like...

```
{
        "common_reference": "United States of America",
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
        "common_reference": "United States Minor Outlying Islands",
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

Another use case for this could be if you app has a region based country selection and you needed all countries in Asia you could perform a `findAllMatchedCountries('asia')` and get all coutnries in Asia.

This function still supports singular lookup. Entering something like `findAllMatchedCountries('GB')` will return a single item array like...

```
[{
        "common_reference": "Uninted Kingdom",
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

Entering a text value into this field that yeilds no results will return an empty (`[]`) array.

## To-Do List:
This package was started as part of a language classification, news analytics projects I'm working on in my personal time.

I've enjoyed building it out but wanted to publish something for starters so I don't let this languish on my personal computer for too long.

Over the next few weeks (hopefully) I plan to build out the following...

* Clean up some of the `common_reference` values. A lot of these are executive decisions I quickly made and could be better researched or refined.
* Provide better documentation on the data sources for each of these fields to help assure people of data validity and no collisions of unique data points.
* Flesh out more complete unit testing. I have a few running right now checking ISO number values but all data values should be validated.
* Add size optimized lookups for common operations. Currently the `complete.json` object used for country data is rather large and bloats this library. I want to make smaller, tree-shakable functions to handle only certain data queries on the fly.
* Setup a small website to visualize all this data in an accessible table for using alongside this library. Right now a lot of it is just compuled in a happhazard Google Doc where I did my initial organizing before translating a CSV into a JSON file.

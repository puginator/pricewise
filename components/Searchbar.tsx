"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import { url } from "inspector";
import React, { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url:string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    //Check if hostname contains amazon.com or amazon.ca
    if (
      hostname.includes('amazon.com') || 
      hostname.includes('amazon.ca') || 
      hostname.endsWith('amazon')
      ){
      return true;
    }
    return false;

  } catch (error) {
    console.log(error)
    return false;
  }
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      return alert('Not a valid Amazon Product Link');
    }
    

    try {
      setIsLoading(true);

      //Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        type="text"
        className="searchbar-input"
        placeholder="Enter a product link"
      />
      <button className="searchbar-btn" type="submit">
        {isLoading ? 'Searching....' : 'Search'}
        
      </button>
    </form>
  );
};

export default Searchbar;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function GetFeedBack({ name }) {
  const router = useRouter();
  const [query, setQuery] = useState({});

  useEffect(() => {
    if (router.isReady) {
      setQuery(router.query);
    }
  }, [router.isReady, router.query]);

  useEffect(() => query && console.log(Object.keys(query).length), [query]);

  return (
    <div>
      <h1>{name}</h1>
      {query && Object.keys(query).length && (
        <>
          <p>collection_id: {query?.collection_id}</p>
          <p>collection_status: {query?.collection_status}</p>
          <p>external_reference: {query?.external_reference}</p>
          <p>merchant_account_id: {query?.merchant_account_id}</p>
          <p>merchant_order_id: {query?.merchant_order_id}</p>
          <p>payment_id: {query?.payment_id}</p>
          <p>payment_type: {query?.payment_type}</p>
          <p>preference_id: {query?.preference_id}</p>
          <p>processing_mode: {query?.processing_mode}</p>
          <p>site_id: {query?.site_id}</p>
          <p>status: {query?.status}</p>
        </>
      )}
    </div>
  );
}

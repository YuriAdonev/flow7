import React, { useState, useEffect } from 'react';

import './staff-edit-orders.scss';
import StaffEditOrdersMoving from "./staff-edit-orders-moving/staff-edit-orders-moving";
import StaffEditOrdersInterruption from "./staff-edit-orders-interruption/staff-edit-orders-interruption";
import useFetch from "../../../../../hooks/use-fetch";

const StaffEditOrders = ({ itemId }) => {
  const [loading, setLoading] = useState(true);
  const [divisionsList, setDivisionsList] = useState([]);
  const [postsList, setPostsList] = useState([]);

  const [{response: divisionsListResponse, isLoading: divisionsListIsLoading, error: divisionsListError}, doFetchDivisionsList] = useFetch('/directories/divisions');
  const [{response: postsListResponse, isLoading: postsListIsLoading, error: postsListError}, doFetchPostsList] = useFetch('/directories/posts');

  useEffect(() => {
    doFetchDivisionsList();
    doFetchPostsList();
  }, []);

  useEffect(() => {
    if (!divisionsListResponse || !postsListResponse) {
      return;
    }
    setDivisionsList(divisionsListResponse.data);
    setPostsList(postsListResponse.data);
    setLoading(false);
  }, [divisionsListResponse, postsListResponse]);

  return (
    <div className="staff-edit">
      {loading ? '' : (
        <>
          <StaffEditOrdersMoving
            divisionsList={divisionsList}
            postsList={postsList}
            itemId={itemId}
          />
          <StaffEditOrdersInterruption
            itemId={itemId}
          />
        </>
      )}
    </div>
  )
};

export default StaffEditOrders;

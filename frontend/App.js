import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import {
  login,
  logout,
  create_quote,
  delete_quote,
  fetch_quotes,
  tip_author,
  total_quotes,
} from "./assets/js/near/utils";
import {
  Box,
  Text,
} from "@chakra-ui/react";

import Nav from "./components/Nav";
import Notification from "./components/Notification";
import CardContainer from "./components/Card";
import AddQuote from "./components/AddQuote";
import Login from "./components/Login";

export default function App() {
  const [data, setData] = useState([]);
  const [totalQuotes, setTotalQuotes] = useState(0);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetch_quotes({ from_index: "0", limit: 20 }).then((res) => {
      setData(res);
    });
    total_quotes().then((res) => {
      setTotalQuotes(res);
    });
    setRefresh(false);
  }, [refresh]);

  const createQuote = () => {
    const payload = { author: window.accountId, text: quote };
    setLoading(true);
    create_quote(payload).then((res) => {
      console.log(res);
      setRefresh(true);
      setLoading(false);
      setQuote("");

      // show Notification
      setShowNotification(true);

      // remove Notification again after css animation completes
      // this allows it to be shown again next time the form is submitted
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    });
  };

  const deleteQuote = (id) => {
    setLoadingDelete(true);
    delete_quote({ id }).then((res) => {
      console.log(res);
      setLoadingDelete(false);
      setRefresh(true);
    });
  };

  const tipAuthor = (id) => {
    tip_author({ id }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      {!window.walletConnection.isSignedIn() ? (
        <Login login={login} />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Nav account={window.accountId} onClick={logout} />
          {showNotification && <Notification message="Successful" />}

          <Box
            width={{ base: "auto", md: "700px" }}
            mt="0rem"
            p={8}
            maxW="1440px"
            minH="100vh"
            m="auto"
          >
            <AddQuote
              quote={quote}
              totalQuotes={totalQuotes}
              onChange={(e) => setQuote(e.target.value)}
              loading={loading}
              createQuote={createQuote}
            />
            <Box my={8}>
              {data.length < 1 && (
                <Text py={4} textAlign="center" color="#fff">
                  No Quote found
                </Text>
              )}
              {data &&
                data
                  ?.sort((a, b) => b.id.localeCompare(a.id))
                  .map((item, index) => (
                    <CardContainer
                      key={index}
                      author={window.accountId}
                      item={item}
                      loading={loadingDelete}
                      tipAuthor={() => tipAuthor(item.id)}
                      deleteQuote={() => deleteQuote(item.id)}
                      refresh={refresh}
                    />
                  ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
